import { useState } from 'react'
import { TrashIcon } from './icons.jsx'
import { DEFAULT_PRIORITY, PRIORITIES, PRIORITY_LABELS } from './tasks.js'

function PriorityOptions() {
  return PRIORITIES.map((priority) => (
    <option key={priority} value={priority}>
      {PRIORITY_LABELS[priority]}
    </option>
  ))
}

export default function TaskTracker({ tasks, summary, onAdd, onToggle, onChangePriority, onDelete }) {
  const [newTitle, setNewTitle] = useState('')
  const [newPriority, setNewPriority] = useState(DEFAULT_PRIORITY)

  function handleAdd(event) {
    event.preventDefault()
    if (!newTitle.trim()) return
    onAdd(newTitle, newPriority)
    setNewTitle('')
    setNewPriority(DEFAULT_PRIORITY)
  }

  return (
    <section className="card tasks-card" aria-labelledby="tasks-title">
      <div className="card-header">
        <div>
          <h2 id="tasks-title">All Tasks</h2>
          <p className="card-sub">Administrative to-dos · saved in this browser</p>
        </div>
        <span className="pill pill-live">Live</span>
      </div>

      <div className="tasks-progress" aria-label="Completion progress">
        <div className="tasks-progress-text">
          <span>
            <strong>{summary.done}</strong> of {summary.total} tasks complete
          </span>
          <span className="tasks-progress-percent">{summary.percent}%</span>
        </div>
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={summary.percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Tasks completed"
        >
          <div className="progress-fill" style={{ width: `${summary.percent}%` }} />
        </div>
      </div>

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
        <button type="submit" className="button-primary" disabled={!newTitle.trim()}>
          Add task
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
                <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
                <span>{task.title}</span>
              </label>
              <div className="task-actions">
                <select
                  className={`priority priority-${task.priority}`}
                  value={task.priority}
                  onChange={(event) => onChangePriority(task.id, event.target.value)}
                  aria-label={`Priority for "${task.title}"`}
                >
                  <PriorityOptions />
                </select>
                <button
                  type="button"
                  className="icon-button delete"
                  onClick={() => onDelete(task.id)}
                  aria-label={`Delete "${task.title}"`}
                  title="Delete task"
                >
                  <TrashIcon />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
