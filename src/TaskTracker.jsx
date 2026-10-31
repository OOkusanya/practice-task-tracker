import { useEffect, useRef, useState } from 'react'
import { PlusIcon, ResetIcon, TrashIcon } from './icons.jsx'
import Modal from './Modal.jsx'
import {
  DEFAULT_PRIORITY,
  EXAMPLE_TASKS,
  PRIORITIES,
  PRIORITY_LABELS,
  TASK_FILTERS,
  TITLE_MAX_LENGTH,
  filterTasks,
  titleError,
  titleLength,
} from './tasks.js'

const EMPTY_FILTER_MESSAGES = {
  open: 'No open tasks. Everything is done.',
  completed: 'No completed tasks yet.',
  high: 'No high-priority tasks.',
}

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

function ResetConfirm({ taskCount, onConfirm, onClose }) {
  return (
    <Modal
      title="Reset demo tasks?"
      titleId="reset-title"
      className="confirm-modal"
      onClose={onClose}
      footer={
        <>
          <button type="button" className="button-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="button-danger" onClick={onConfirm}>
            Reset tasks
          </button>
        </>
      }
    >
      <p className="modal-text">
        This replaces the {taskCount} {taskCount === 1 ? 'task' : 'tasks'} saved in this browser with the{' '}
        {EXAMPLE_TASKS.length} original sample tasks and priorities.
      </p>
      <p className="modal-text">
        Any tasks you added, edited, completed, or deleted will be lost. This can&apos;t be undone.
      </p>
    </Modal>
  )
}

function TaskOverview({ summary, onResetClick }) {
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

      <section className="restore" aria-labelledby="restore-title">
        <h3 id="restore-title" className="restore-title">
          Restore sample tasks
        </h3>
        <p id="restore-help" className="restore-help">
          Brings back the original sample tasks and priorities, replacing any changes saved in this browser.
        </p>
        <button
          type="button"
          className="button-secondary button-reset"
          onClick={onResetClick}
          aria-describedby="restore-help"
        >
          <ResetIcon />
          Reset demo tasks
        </button>
      </section>
    </aside>
  )
}

export default function TaskTracker({ tasks, summary, onAdd, onToggle, onChangePriority, onDelete, onReset }) {
  const [formOpen, setFormOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [confirmingReset, setConfirmingReset] = useState(false)
  const visibleTasks = filterTasks(tasks, filter)
  const filterLabel = TASK_FILTERS.find((option) => option.id === filter).label
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
              <h2 id="tasks-title">Tasks</h2>
              <span className="card-sub" aria-live="polite">
                Showing {visibleTasks.length} of {tasks.length}
              </span>
            </div>

            <div className="filters" role="group" aria-label="Filter tasks">
              {TASK_FILTERS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={option.id === filter ? 'filter active' : 'filter'}
                  aria-pressed={option.id === filter}
                  onClick={() => setFilter(option.id)}
                >
                  {option.label}
                  <span className="filter-count">{filterTasks(tasks, option.id).length}</span>
                </button>
              ))}
            </div>

            {tasks.length === 0 ? (
              <p className="empty">No tasks yet. Use New task to add one.</p>
            ) : visibleTasks.length === 0 ? (
              <p className="empty">
                {EMPTY_FILTER_MESSAGES[filter]}{' '}
                <button type="button" className="link-button" onClick={() => setFilter('all')}>
                  Show all tasks
                </button>
              </p>
            ) : (
              <ul className="task-list" aria-label={`${filterLabel} tasks`}>
                {visibleTasks.map((task) => (
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

        <TaskOverview summary={summary} onResetClick={() => setConfirmingReset(true)} />
      </div>

      {confirmingReset && (
        <ResetConfirm
          taskCount={tasks.length}
          onClose={() => setConfirmingReset(false)}
          onConfirm={() => {
            onReset()
            setFilter('all')
            setConfirmingReset(false)
          }}
        />
      )}
    </div>
  )
}
