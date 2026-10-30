import { describe, expect, it } from 'vitest'
import { EXAMPLE_TASKS, STORAGE_KEY, completionPercent, createTask, loadTasks, saveTasks } from './tasks.js'

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

describe('createTask', () => {
  it('trims the title and starts incomplete', () => {
    const task = createTask('  File quarterly taxes  ')
    expect(task.title).toBe('File quarterly taxes')
    expect(task.completed).toBe(false)
    expect(task.id).toBeTruthy()
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

    const tasks = [{ id: 'a', title: 'Test', completed: true }]
    saveTasks(tasks, storage)
    expect(loadTasks(storage)).toEqual(tasks)
  })

  it('falls back to examples when saved data is corrupt', () => {
    expect(loadTasks(memoryStorage({ [STORAGE_KEY]: 'not json' }))).toEqual(EXAMPLE_TASKS)
  })
})
