// Task data and helpers. All example data is fictional — no real patient information.

export const STORAGE_KEY = 'practice-task-tracker.tasks'

export const PRIORITIES = ['high', 'medium', 'low']
export const DEFAULT_PRIORITY = 'medium'
export const PRIORITY_LABELS = { high: 'High', medium: 'Medium', low: 'Low' }

export const TITLE_MAX_LENGTH = 120

// Length as a person would count it: surrounding spaces ignored, an emoji counts as one character.
export function titleLength(title) {
  return [...title.trim()].length
}

// Returns null when the title can be saved, otherwise 'empty' or 'too-long'.
export function titleError(title) {
  const length = titleLength(title)
  if (length === 0) return 'empty'
  if (length > TITLE_MAX_LENGTH) return 'too-long'
  return null
}

export const EXAMPLE_TASKS = [
  { id: 'example-1', title: 'Renew professional liability insurance', completed: false, priority: 'high' },
  { id: 'example-2', title: 'Update intake form template', completed: true, priority: 'medium' },
  { id: 'example-3', title: 'Order printer paper and toner', completed: false, priority: 'low' },
  { id: 'example-4', title: 'Review monthly billing summary', completed: false, priority: 'medium' },
  { id: 'example-5', title: 'Schedule continuing education course', completed: true, priority: 'low' },
]

export function completionPercent(tasks) {
  if (tasks.length === 0) return 0
  const done = tasks.filter((task) => task.completed).length
  return Math.round((done / tasks.length) * 100)
}

export function isPriority(value) {
  return PRIORITIES.includes(value)
}

export function createTask(title, priority = DEFAULT_PRIORITY) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    priority: isPriority(priority) ? priority : DEFAULT_PRIORITY,
  }
}

// Tasks saved before priorities existed (or with an unknown value) get the default priority.
function withPriority(task) {
  return isPriority(task.priority) ? task : { ...task, priority: DEFAULT_PRIORITY }
}

// Returns saved tasks, or the example tasks on first visit or if storage is unreadable.
export function loadTasks(storage = globalThis.localStorage) {
  try {
    const saved = storage.getItem(STORAGE_KEY)
    if (saved === null) return EXAMPLE_TASKS
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed.map(withPriority) : EXAMPLE_TASKS
  } catch {
    return EXAMPLE_TASKS
  }
}

export function saveTasks(tasks, storage = globalThis.localStorage) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // Storage may be full or blocked (e.g. private browsing); the app still works for this session.
  }
}

// Counts for the dashboard's Task Completion card.
export function taskSummary(tasks) {
  const open = tasks.filter((task) => !task.completed)
  return {
    total: tasks.length,
    done: tasks.length - open.length,
    open: open.length,
    openHighPriority: open.filter((task) => task.priority === 'high').length,
    openByPriority: Object.fromEntries(
      PRIORITIES.map((priority) => [priority, open.filter((task) => task.priority === priority).length]),
    ),
    percent: completionPercent(tasks),
  }
}

// Open tasks, highest priority first (original order kept within a priority), for the dashboard widget.
export function openTasksByPriority(tasks, limit = Infinity) {
  return tasks
    .filter((task) => !task.completed)
    .toSorted((a, b) => PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority))
    .slice(0, limit)
}
