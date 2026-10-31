import { useEffect, useRef, useState } from 'react'
import { PlusIcon, TrashIcon } from './icons.jsx'
import {
  DEFAULT_PRIORITY,
  PRIORITIES,
  PRIORITY_LABELS,
  TITLE_MAX_LENGTH,
  titleError,
  titleLength,
} from './tasks.js'

function PriorityOptions() {
  return PRIORITIES.map((priority) => (
    <option key={priority} value={priority}>
      {PRIORITY_LABELS[priority]}
    </option>
  ))
}

function NewTaskForm({ onAdd, onClose }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState(DEFAULT_PRIORITY)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const length = titleLength(title)
  const error = titleError(title)
  const tooLong = error === 'too-long'
  const counterState = tooLong ? 'over' : length > TITLE_MAX_LENGTH - 20 ? 'near' : ''

  function handleSubmit(event) {
    event.preventDefault()
    if (error) return
    onAdd(title, priority)
    onClose()
  }

  return (
    <form
      className="card new-task-form"
      onSubmit={handleSubmit}
      onKeyDown={(event) => event.key === 'Escape' && onClose()}
      aria-label="New task"
    >
      <div className="field">
        <label htmlFor="new-task" className="field-label">
          Task description
        </label>
        <input
          ref={inputRef}
          id="new-task"
          type="text"
          placeholder="e.g. Renew HIPAA training certificates"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-invalid={tooLong}
          aria-describedby="new-task-help new-task-counter"
          className={tooLong ? 'invalid' : undefined}
        />
        <div className="field-foot">
          <span id="new-task-help" className={tooLong ? 'field-error' : 'field-hint'} aria-live="polite">
            {tooLong
              ? `Too long by ${length - TITLE_MAX_LENGTH} characters. Task descriptions can be up to ${TITLE_MAX_LENGTH} characters.`
              : 'Do not enter patient names or other identifying information.'}
          </span>
          <span id="new-task-counter" className={`counter ${counterState}`}>
            {length} / {TITLE_MAX_LENGTH}
          </span>
        </div>
      </div>

      <div className="form-actions">
        <label htmlFor="new-task-priority" className="field-label inline">
          Priority
        </label>
        <select
          id="new-task-priority"
          className={`priority priority-${priority}`}
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <PriorityOptions />
        </select>
        <span className="spacer" />
        <button type="button" className="button-secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="button-primary" disabled={Boolean(error)}>
          Add task
        </button>
      </div>
    </form>
  )
}

function Metric({ label, value, detail, tone }) {
  return (
    <div className={`card metric ${tone ? `metric-${tone}` : ''}`}>
      <span className="metric-label">{label}</span>
      <span className="metric-value">{value}</span>
      <span className="metric-detail">{detail}</span>
    </div>
  )
}

function TaskOverview({ summary }) {
  const maxOpen = Math.max(1, ...PRIORITIES.map((priority) => summary.openByPriority[priority]))

  return (
    <aside className="card task-overview" aria-labelledby="overview-title">
      <h2 id="overview-title">Task overview</h2>

      <div className="overview-completion">
        <span className="overview-percent">{summary.percent}%</span>
        <span className="overview-caption">
          complete · {summary.done} of {summary.total}
        </span>
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

      <h3 className="overview-subhead">Remaining by priority</h3>
      <ul className="priority-breakdown">
        {PRIORITIES.map((priority) => {
          const count = summary.openByPriority[priority]
          return (
            <li key={priority}>
              <span className={`dot dot-${priority}`} aria-hidden="true" />
              <span className="breakdown-label">{PRIORITY_LABELS[priority]}</span>
              <span className="breakdown-bar" aria-hidden="true">
                <span className={`breakdown-fill fill-${priority}`} style={{ width: `${(count / maxOpen) * 100}%` }} />
              </span>
              <span className="breakdown-count">{count}</span>
            </li>
          )
        })}
      </ul>

      <p className="overview-note">Tasks are saved in this browser only.</p>
    </aside>
  )
}

export default function TaskTracker({ tasks, summary, onAdd, onToggle, onChangePriority, onDelete }) {
  const [formOpen, setFormOpen] = useState(false)
  const newTaskButtonRef = useRef(null)

  function closeForm() {
    setFormOpen(false)
    newTaskButtonRef.current?.focus()
  }

  return (
    <div className="tasks-page">
      <div className="page-header">
        <p className="page-intro">Administrative to-dos for the practice.</p>
        <button
          ref={newTaskButtonRef}
          type="button"
          className="button-primary button-new"
          onClick={() => setFormOpen(true)}
          aria-expanded={formOpen}
        >
          <PlusIcon />
          New task
        </button>
      </div>

      <section className="metrics" aria-label="Task summary">
        <Metric label="Open tasks" value={summary.open} detail={`of ${summary.total} total`} />
        <Metric
          label="High priority"
          value={summary.openHighPriority}
          detail={summary.openHighPriority > 0 ? 'need attention' : 'none open'}
          tone={summary.openHighPriority > 0 ? 'alert' : undefined}
        />
        <Metric label="Completed" value={summary.done} detail={`${summary.percent}% of all tasks`} tone="success" />
      </section>

      <div className="workspace">
        <div className="workspace-main">
          {formOpen && <NewTaskForm onAdd={onAdd} onClose={closeForm} />}

          <section className="card task-panel" aria-labelledby="tasks-title">
            <div className="card-header">
              <h2 id="tasks-title">All tasks</h2>
              <span className="card-sub">{tasks.length} total</span>
            </div>

            {tasks.length === 0 ? (
              <p className="empty">No tasks yet. Use New task to add one.</p>
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
        </div>

        <TaskOverview summary={summary} />
      </div>
    </div>
  )
}
