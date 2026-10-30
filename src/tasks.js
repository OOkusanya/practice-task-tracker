// Task data and helpers. All example data is fictional — no real patient information.

export const STORAGE_KEY = 'practice-task-tracker.tasks'

export const EXAMPLE_TASKS = [
  { id: 'example-1', title: 'Renew professional liability insurance', completed: false },
  { id: 'example-2', title: 'Update intake form template', completed: true },
  { id: 'example-3', title: 'Order printer paper and toner', completed: false },
  { id: 'example-4', title: 'Review monthly billing summary', completed: false },
  { id: 'example-5', title: 'Schedule continuing education course', completed: true },
]

export function completionPercent(tasks) {
  if (tasks.length === 0) return 0
  const done = tasks.filter((task) => task.completed).length
  return Math.round((done / tasks.length) * 100)
}

export function createTask(title) {
  return { id: crypto.randomUUID(), title: title.trim(), completed: false }
}

// Returns saved tasks, or the example tasks on first visit or if storage is unreadable.
export function loadTasks(storage = globalThis.localStorage) {
  try {
    const saved = storage.getItem(STORAGE_KEY)
    if (saved === null) return EXAMPLE_TASKS
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : EXAMPLE_TASKS
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
