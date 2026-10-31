import {
  APPOINTMENT_STATUSES,
  CLIENT_STATS,
  INVOICE_STATS,
  PRACTICE_ACTIVITY,
  TODAYS_APPOINTMENTS,
  appointmentSummary,
} from './demoData.js'
import { useState } from 'react'
import { AlertIcon, CheckIcon, PinIcon, VideoIcon } from './icons.jsx'
import Modal from './Modal.jsx'
import { PRIORITY_LABELS, openTasksByPriority } from './tasks.js'

const APPOINTMENTS = appointmentSummary(TODAYS_APPOINTMENTS)

function DemoPill() {
  return (
    <span className="pill pill-demo" title="Fictional sample data for demonstration">
      Demo data
    </span>
  )
}

function LivePill() {
  return <span className="pill pill-live">Live</span>
}

// One "Demo data" label covers the whole summary row; only Task Completion is live.
export function OverviewCards({ summary }) {
  return (
    <section className="overview-section" aria-labelledby="overview-title">
      <div className="section-head">
        <h2 id="overview-title">At a glance</h2>
        <span className="section-note">
          <DemoPill /> Sample figures, except Task Completion
        </span>
      </div>

      <div className="overview">
        <div className="card stat stat-feature">
          <span className="stat-label">Today&apos;s Appointments</span>
          <span className="stat-value">{APPOINTMENTS.total}</span>
          <span className="stat-detail">
            {APPOINTMENTS.inPerson} in person · {APPOINTMENTS.telehealth} telehealth
          </span>
          <div className="stat-breakdown">
            <span>
              <strong>{APPOINTMENTS.completed}</strong> completed
            </span>
            <span>
              <strong>{APPOINTMENTS.inSession}</strong> in session
            </span>
            <span>
              <strong>{APPOINTMENTS.upcoming}</strong> upcoming
            </span>
            {APPOINTMENTS.unconfirmed > 0 && (
              <span className="feature-flag">
                <AlertIcon />
                {APPOINTMENTS.unconfirmed} unconfirmed
              </span>
            )}
          </div>
        </div>

        <div className="card stat">
          <span className="stat-label">Active Clients</span>
          <span className="stat-value">{CLIENT_STATS.active}</span>
          <span className="stat-detail">+{CLIENT_STATS.newThisMonth} new this month</span>
        </div>

        <div className="card stat">
          <span className="stat-label">Outstanding Invoices</span>
          <span className="stat-value">{INVOICE_STATS.outstanding}</span>
          <span className="stat-detail">{INVOICE_STATS.count} invoices</span>
          <span className="overdue-flag">
            <AlertIcon />
            {INVOICE_STATS.overdueCount} overdue · {INVOICE_STATS.overdueAmount}
          </span>
        </div>

        <a href="#tasks" className="card stat stat-link">
          <div className="stat-top">
            <span className="stat-label">Task Completion</span>
            <LivePill />
          </div>
          <span className="stat-value">{summary.percent}%</span>
          <div className="stat-bar" aria-hidden="true">
            <div className="progress-fill" style={{ width: `${summary.percent}%` }} />
          </div>
          <span className="stat-detail">
            {summary.open} open · {summary.openHighPriority} high priority
          </span>
        </a>
      </div>
    </section>
  )
}

const STATUS_ICONS = { completed: CheckIcon, unconfirmed: AlertIcon }

function StatusBadge({ status }) {
  const StatusIcon = STATUS_ICONS[status]
  return (
    <span className={`status status-${status}`}>
      {StatusIcon ? <StatusIcon /> : <span className="status-dot" aria-hidden="true" />}
      {APPOINTMENT_STATUSES[status]}
    </span>
  )
}

function AppointmentDetails({ appt, onClose }) {
  return (
    <Modal
      title="Appointment details"
      titleId="appt-details-title"
      className="appt-modal"
      onClose={onClose}
      footer={
        <>
          <p className="modal-note">
            Read-only demo data. Scheduling and editing appointments are planned, not part of this demo.
          </p>
          <button type="button" className="button-secondary" onClick={onClose}>
            Close
          </button>
        </>
      }
    >
      <div className="detail-hero">
        <span className="avatar avatar-lg" aria-hidden="true">
          {appt.client.replaceAll('.', '')}
        </span>
        <div>
          <span className="detail-client">Client {appt.client}</span>
          <span className="detail-when">Today · {appt.time}</span>
        </div>
        <StatusBadge status={appt.status} />
      </div>

      <dl className="detail-list">
        <div>
          <dt>Time</dt>
          <dd>Today, {appt.time}</dd>
        </div>
        <div>
          <dt>Client</dt>
          <dd>{appt.client} (initials only)</dd>
        </div>
        <div>
          <dt>Clinician</dt>
          <dd>{appt.clinician}</dd>
        </div>
        <div>
          <dt>Session type</dt>
          <dd>{appt.type}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{appt.length}</dd>
        </div>
        <div>
          <dt>Location / mode</dt>
          <dd className="detail-mode">
            {appt.mode === 'Telehealth' ? <VideoIcon /> : <PinIcon />}
            {appt.mode}
          </dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{APPOINTMENT_STATUSES[appt.status]}</dd>
        </div>
      </dl>
    </Modal>
  )
}

export function TodaysAppointments() {
  const [selectedId, setSelectedId] = useState(null)
  const selected = TODAYS_APPOINTMENTS.find((appt) => appt.id === selectedId)

  return (
    <section className="card appointments" aria-labelledby="appointments-title">
      <div className="card-header">
        <div>
          <h2 id="appointments-title">Today&apos;s Appointments</h2>
          <p className="card-sub">
            {APPOINTMENTS.total} sessions · {APPOINTMENTS.completed} completed · {APPOINTMENTS.inSession} in
            session · {APPOINTMENTS.upcoming} upcoming
            {APPOINTMENTS.unconfirmed > 0 && (
              <span className="sub-alert"> · {APPOINTMENTS.unconfirmed} awaiting confirmation</span>
            )}
          </p>
        </div>
        <DemoPill />
      </div>

      <table className="appt-table">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Client</th>
            <th scope="col">Session</th>
            <th scope="col">Clinician</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {TODAYS_APPOINTMENTS.map((appt) => (
            <tr
              key={appt.id}
              className={`appt-row row-${appt.status}${appt.id === selectedId ? ' is-selected' : ''}`}
              onClick={() => setSelectedId(appt.id)}
            >
              <td className="appt-time">{appt.time}</td>
              <td className="appt-client">
                <span className="avatar" aria-hidden="true">
                  {appt.client.replaceAll('.', '')}
                </span>
                <button
                  type="button"
                  className="appt-open"
                  aria-label={`View details: ${appt.time}, Client ${appt.client}, ${appt.type}`}
                >
                  Client {appt.client}
                </button>
              </td>
              <td className="appt-session">
                <span className="appt-type">{appt.type}</span>
                <span className="appt-meta">
                  {appt.mode === 'Telehealth' ? <VideoIcon /> : <PinIcon />}
                  {appt.mode} · {appt.length}
                </span>
              </td>
              <td className="appt-clinician">{appt.clinician}</td>
              <td className="appt-status">
                <StatusBadge status={appt.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="table-hint">Select an appointment to see its details.</p>

      {selected && <AppointmentDetails appt={selected} onClose={() => setSelectedId(null)} />}
    </section>
  )
}

export function TasksWidget({ tasks, summary, onToggle }) {
  const preview = openTasksByPriority(tasks, 4)

  return (
    <section className="card" aria-labelledby="tasks-widget-title">
      <div className="card-header">
        <div>
          <h2 id="tasks-widget-title">Practice Tasks</h2>
          <p className="card-sub">
            {summary.done} of {summary.total} complete · {summary.openHighPriority} high priority open
          </p>
        </div>
        <LivePill />
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

      {preview.length === 0 ? (
        <p className="widget-empty">{tasks.length === 0 ? 'No tasks yet.' : 'All tasks complete.'}</p>
      ) : (
        <ul className="list mini-tasks">
          {preview.map((task) => (
            <li key={task.id} className="mini-task">
              <label className="task-label">
                <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
                <span>{task.title}</span>
              </label>
              <span className={`priority-tag priority-${task.priority}`}>{PRIORITY_LABELS[task.priority]}</span>
            </li>
          ))}
        </ul>
      )}

      <a href="#tasks" className="widget-link">
        {summary.open > preview.length ? `View all ${summary.open} open tasks` : 'Manage tasks'} →
      </a>
    </section>
  )
}

export function PracticeActivity() {
  return (
    <section className="card" aria-labelledby="activity-title">
      <div className="card-header">
        <div>
          <h2 id="activity-title">Practice Activity</h2>
          <p className="card-sub">Recent updates across the practice</p>
        </div>
        <DemoPill />
      </div>
      <ul className="list">
        {PRACTICE_ACTIVITY.map((item) => (
          <li key={item.id} className="activity">
            <span className={`activity-dot activity-${item.kind}`} aria-hidden="true" />
            <div className="activity-body">
              <span className="activity-text">{item.text}</span>
              <span className="activity-detail">{item.detail}</span>
            </div>
            <span className="activity-time">{item.time}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
