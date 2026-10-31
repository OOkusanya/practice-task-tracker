import { useEffect, useState } from 'react'
import {
  DEFAULT_PRIORITY,
  PRIORITIES,
  PRIORITY_LABELS,
  completionPercent,
  createTask,
  loadTasks,
  saveTasks,
} from './tasks.js'

function PriorityOptions() {
  return PRIORITIES.map((priority) => (
    <option key={priority} value={priority}>
      {PRIORITY_LABELS[priority]}
    </option>
  ))
}

export default function App() {
  const [tasks, setTasks] = useState(() => loadTasks())
  const [newTitle, setNewTitle] = useState('')
  const [newPriority, setNewPriority] = useState(DEFAULT_PRIORITY)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const percent = completionPercent(tasks)
  const doneCount = tasks.filter((task) => task.completed).length

  function handleAdd(event) {
    event.preventDefault()
    if (!newTitle.trim()) return
    setTasks((current) => [...current, createTask(newTitle, newPriority)])
    setNewTitle('')
    setNewPriority(DEFAULT_PRIORITY)
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    )
  }

  function changePriority(id, priority) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, priority } : task)))
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  return (
    <main className="app">
      <header>
        <h1>Practice Task Tracker</h1>
        <p className="subtitle">Administrative to-dos for your practice</p>
      </header>

      <section className="progress" aria-label="Completion progress">
        <div className="progress-text">
          <span className="progress-percent">{percent}%</span>
          <span>
            {doneCount} of {tasks.length} tasks complete
          </span>
        </div>
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Tasks completed"
        >
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
      </section>

      <form className="add-form" onSubmit={handleAdd}>
        <label htmlFor="new-task" className="visually-hidden">
          New task
        </label>
        <input
          id="new-task"
          type="text"
          placeholder="Add an administrative task…"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          maxLength={120}
        />
        <label htmlFor="new-task-priority" className="visually-hidden">
          Priority
        </label>
        <select
          id="new-task-priority"
          className={`priority priority-${newPriority}`}
          value={newPriority}
          onChange={(event) => setNewPriority(event.target.value)}
        >
          <PriorityOptions />
        </select>
        <button type="submit" disabled={!newTitle.trim()}>
          Add
        </button>
      </form>

      <p className="privacy-note">Do not enter patient names or other identifying information.</p>

      {tasks.length === 0 ? (
        <p className="empty">No tasks yet. Add one above.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'task done' : 'task'}>
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span>{task.title}</span>
              </label>
              <select
                className={`priority priority-${task.priority}`}
                value={task.priority}
                onChange={(event) => changePriority(task.id, event.target.value)}
                aria-label={`Priority for "${task.title}"`}
              >
                <PriorityOptions />
              </select>
              <button
                type="button"
                className="delete"
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete "${task.title}"`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
