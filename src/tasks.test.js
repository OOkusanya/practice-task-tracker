import { describe, expect, it } from 'vitest'
import {
  DEFAULT_PRIORITY,
  EXAMPLE_TASKS,
  PRIORITIES,
  STORAGE_KEY,
  TITLE_MAX_LENGTH,
  completionPercent,
  createTask,
  filterTasks,
  loadTasks,
  openTasksByPriority,
  saveTasks,
  taskSummary,
  titleError,
  titleLength,
} from './tasks.js'

function memoryStorage(initial = {}) {
  const data = { ...initial }
  return {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value)
    },
  }
}

describe('completionPercent', () => {
  it('returns 0 for an empty list', () => {
    expect(completionPercent([])).toBe(0)
  })

  it('rounds to a whole percent', () => {
    const tasks = [{ completed: true }, { completed: false }, { completed: false }]
    expect(completionPercent(tasks)).toBe(33)
  })
})

describe('taskSummary', () => {
  it('counts done, open, and open high-priority tasks', () => {
    const tasks = [
      { completed: true, priority: 'high' },
      { completed: false, priority: 'high' },
      { completed: false, priority: 'low' },
      { completed: true, priority: 'medium' },
    ]
    expect(taskSummary(tasks)).toEqual({
      total: 4,
      done: 2,
      open: 2,
      openHighPriority: 1,
      openByPriority: { high: 1, medium: 0, low: 1 },
      percent: 50,
    })
  })

  it('handles an empty list', () => {
    expect(taskSummary([])).toEqual({
      total: 0,
      done: 0,
      open: 0,
      openHighPriority: 0,
      openByPriority: { high: 0, medium: 0, low: 0 },
      percent: 0,
    })
  })
})

describe('task title rules', () => {
  it('allows up to 120 characters', () => {
    expect(TITLE_MAX_LENGTH).toBe(120)
    expect(titleError('A'.repeat(120))).toBeNull()
  })

  it('rejects 121 or more characters instead of trimming them', () => {
    expect(titleError('A'.repeat(121))).toBe('too-long')
    expect(titleError('A'.repeat(130))).toBe('too-long')
  })

  it('rejects empty or space-only titles', () => {
    expect(titleError('')).toBe('empty')
    expect(titleError('   ')).toBe('empty')
  })

  it('ignores surrounding spaces and counts an emoji as one character', () => {
    expect(titleLength('  Call landlord  ')).toBe(13)
    expect(titleLength('Order 📦')).toBe(7)
    expect(titleError(`  ${'A'.repeat(120)}  `)).toBeNull()
  })
})

describe('openTasksByPriority', () => {
  const tasks = [
    { id: 'a', completed: false, priority: 'low' },
    { id: 'b', completed: true, priority: 'high' },
    { id: 'c', completed: false, priority: 'medium' },
    { id: 'd', completed: false, priority: 'high' },
    { id: 'e', completed: false, priority: 'medium' },
  ]

  it('lists open tasks from high to low, keeping order within a priority', () => {
    expect(openTasksByPriority(tasks).map((task) => task.id)).toEqual(['d', 'c', 'e', 'a'])
  })

  it('respects the limit', () => {
    expect(openTasksByPriority(tasks, 2).map((task) => task.id)).toEqual(['d', 'c'])
  })
})

describe('filterTasks', () => {
  const tasks = [
    { id: 'a', completed: false, priority: 'high' },
    { id: 'b', completed: true, priority: 'high' },
    { id: 'c', completed: false, priority: 'low' },
    { id: 'd', completed: true, priority: 'medium' },
  ]
  const ids = (filter) => filterTasks(tasks, filter).map((task) => task.id)

  it('filters by status and priority, keeping list order', () => {
    expect(ids('all')).toEqual(['a', 'b', 'c', 'd'])
    expect(ids('open')).toEqual(['a', 'c'])
    expect(ids('completed')).toEqual(['b', 'd'])
    expect(ids('high')).toEqual(['a', 'b'])
  })

  it('treats an unknown filter as All', () => {
    expect(ids('archived')).toEqual(['a', 'b', 'c', 'd'])
  })
})

describe('createTask', () => {
  it('trims the title and starts incomplete', () => {
    const task = createTask('  File quarterly taxes  ')
    expect(task.title).toBe('File quarterly taxes')
    expect(task.completed).toBe(false)
    expect(task.id).toBeTruthy()
  })

  it('defaults to medium priority', () => {
    expect(DEFAULT_PRIORITY).toBe('medium')
    expect(createTask('Call landlord').priority).toBe('medium')
  })

  it('accepts each priority level', () => {
    for (const priority of PRIORITIES) {
      expect(createTask('Task', priority).priority).toBe(priority)
    }
  })

  it('falls back to medium for an unknown priority', () => {
    expect(createTask('Task', 'urgent').priority).toBe('medium')
  })
})

describe('loadTasks / saveTasks', () => {
  it('uses example tasks on first visit', () => {
    expect(loadTasks(memoryStorage())).toEqual(EXAMPLE_TASKS)
  })

  it('round-trips saved tasks, including an empty list', () => {
    const storage = memoryStorage()
    saveTasks([], storage)
    expect(loadTasks(storage)).toEqual([])

    const tasks = [{ id: 'a', title: 'Test', completed: true, priority: 'high' }]
    saveTasks(tasks, storage)
    expect(loadTasks(storage)).toEqual(tasks)
  })

  it('round-trips priorities, including a changed one', () => {
    const storage = memoryStorage()
    const tasks = [
      { id: 'a', title: 'First', completed: false, priority: 'high' },
      { id: 'b', title: 'Second', completed: true, priority: 'low' },
    ]
    saveTasks(tasks, storage)
    const changed = loadTasks(storage).map((task) => (task.id === 'a' ? { ...task, priority: 'low' } : task))
    saveTasks(changed, storage)
    expect(loadTasks(storage).map((task) => task.priority)).toEqual(['low', 'low'])
  })

  it('gives medium priority to tasks saved before priorities existed', () => {
    const storage = memoryStorage({
      [STORAGE_KEY]: JSON.stringify([
        { id: 'old', title: 'Saved in version 1', completed: true },
        { id: 'odd', title: 'Unknown priority', completed: false, priority: 'urgent' },
      ]),
    })
    expect(loadTasks(storage)).toEqual([
      { id: 'old', title: 'Saved in version 1', completed: true, priority: 'medium' },
      { id: 'odd', title: 'Unknown priority', completed: false, priority: 'medium' },
    ])
  })

  it('gives every example task a valid priority', () => {
    for (const task of EXAMPLE_TASKS) {
      expect(PRIORITIES).toContain(task.priority)
    }
  })

  it('falls back to examples when saved data is corrupt', () => {
    expect(loadTasks(memoryStorage({ [STORAGE_KEY]: 'not json' }))).toEqual(EXAMPLE_TASKS)
  })
})
