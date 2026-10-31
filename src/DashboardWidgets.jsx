import {
  APPOINTMENT_STATUSES,
  OTHER_STATS,
  PRACTICE_ACTIVITY,
  TODAYS_APPOINTMENTS,
  appointmentSummary,
} from './demoData.js'
import { PinIcon, VideoIcon } from './icons.jsx'
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

function StatCard({ label, value, detail, live = false, children }) {
  return (
    <div className="card stat">
      <div className="stat-top">
        <span className="stat-label">{label}</span>
        {live ? <LivePill /> : <DemoPill />}
      </div>
      <span className="stat-value">{value}</span>
      {children}
      <span className="stat-detail">{detail}</span>
    </div>
  )
}

export function OverviewCards({ summary }) {
  return (
    <section className="overview" aria-label="Practice overview">
      <StatCard
        label="Today's Appointments"
        value={APPOINTMENTS.total}
        detail={`${APPOINTMENTS.inPerson} in person · ${APPOINTMENTS.telehealth} telehealth`}
      />
      {OTHER_STATS.map((stat) => (
        <StatCard key={stat.id} label={stat.label} value={stat.value} detail={stat.detail} />
      ))}
      <StatCard
        label="Task Completion"
        value={`${summary.percent}%`}
        detail={`${summary.open} open · ${summary.openHighPriority} high priority`}
        live
      >
        <div className="stat-bar" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${summary.percent}%` }} />
        </div>
      </StatCard>
    </section>
  )
}

export function TodaysAppointments() {
  return (
    <section className="card appointments" aria-labelledby="appointments-title">
      <div className="card-header">
        <div>
          <h2 id="appointments-title">Today&apos;s Appointments</h2>
          <p className="card-sub">
            {APPOINTMENTS.total} sessions · {APPOINTMENTS.completed} completed · {APPOINTMENTS.inSession} in
            session · {APPOINTMENTS.upcoming} upcoming
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
            <tr key={appt.id} className={appt.status === 'completed' ? 'is-past' : undefined}>
              <td className="appt-time">{appt.time}</td>
              <td className="appt-client">
                <span className="avatar" aria-hidden="true">
                  {appt.client.replaceAll('.', '')}
                </span>
                <span>Client {appt.client}</span>
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
                <span className={`status status-${appt.status}`}>{APPOINTMENT_STATUSES[appt.status]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
