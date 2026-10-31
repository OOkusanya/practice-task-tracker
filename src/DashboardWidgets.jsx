import { OVERVIEW_STATS, PRACTICE_ACTIVITY, UPCOMING_APPOINTMENTS } from './demoData.js'
import { PinIcon, VideoIcon } from './icons.jsx'

function DemoPill() {
  return (
    <span className="pill pill-demo" title="Fictional sample data for demonstration">
      Demo data
    </span>
  )
}

export function OverviewCards({ summary }) {
  return (
    <section className="overview" aria-label="Practice overview">
      {OVERVIEW_STATS.map((stat) => (
        <div key={stat.id} className="card stat">
          <div className="stat-top">
            <span className="stat-label">{stat.label}</span>
            <DemoPill />
          </div>
          <span className="stat-value">{stat.value}</span>
          <span className="stat-detail">{stat.detail}</span>
        </div>
      ))}

      <a href="#tasks" className="card stat stat-link">
        <div className="stat-top">
          <span className="stat-label">Task Completion</span>
          <span className="pill pill-live">Live</span>
        </div>
        <span className="stat-value">{summary.percent}%</span>
        <div className="stat-bar" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${summary.percent}%` }} />
        </div>
        <span className="stat-detail">
          {summary.open} open · {summary.openHighPriority} high priority
        </span>
      </a>
    </section>
  )
}

export function UpcomingAppointments() {
  return (
    <section className="card" aria-labelledby="appointments-title">
      <div className="card-header">
        <div>
          <h2 id="appointments-title">Upcoming Appointments</h2>
          <p className="card-sub">Today · next {UPCOMING_APPOINTMENTS.length} sessions</p>
        </div>
        <DemoPill />
      </div>
      <ul className="list">
        {UPCOMING_APPOINTMENTS.map((appt) => (
          <li key={appt.id} className="appt">
            <span className="appt-time">{appt.time}</span>
            <span className="avatar" aria-hidden="true">
              {appt.client.replaceAll('.', '')}
            </span>
            <div className="appt-body">
              <span className="appt-title">
                Client {appt.client} · {appt.type}
              </span>
              <span className="appt-meta">
                {appt.mode === 'Telehealth' ? <VideoIcon /> : <PinIcon />}
                {appt.mode} · {appt.length} · {appt.clinician}
              </span>
            </div>
          </li>
        ))}
      </ul>
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
