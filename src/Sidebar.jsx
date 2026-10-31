import { PRACTICE_NAME } from './demoData.js'
import {
  BillingIcon,
  BrandMark,
  CalendarIcon,
  ClientsIcon,
  CloseIcon,
  DashboardIcon,
  SettingsIcon,
  TasksIcon,
} from './icons.jsx'

// Only Dashboard and Tasks exist. The rest are shown as planned, not as working links.
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', href: '#dashboard', Icon: DashboardIcon },
  { id: 'tasks', label: 'Tasks', href: '#tasks', Icon: TasksIcon },
  { id: 'appointments', label: 'Appointments', Icon: CalendarIcon },
  { id: 'clients', label: 'Clients', Icon: ClientsIcon },
  { id: 'billing', label: 'Billing', Icon: BillingIcon },
  { id: 'settings', label: 'Settings', Icon: SettingsIcon },
]

export default function Sidebar({ open, onClose }) {
  return (
    <aside id="sidebar" className={open ? 'sidebar open' : 'sidebar'} aria-label="Main">
      <div className="brand">
        <BrandMark />
        <div className="brand-text">
          <span className="brand-name">Willow</span>
          <span className="brand-sub">Therapy &amp; Wellness</span>
        </div>
        <button type="button" className="icon-button sidebar-close" onClick={onClose} aria-label="Close menu">
          <CloseIcon />
        </button>
      </div>

      <nav className="nav">
        <ul>
          {NAV_ITEMS.map(({ id, label, href, Icon }) => (
            <li key={id}>
              {href ? (
                <a
                  href={href}
                  className={id === 'dashboard' ? 'nav-item active' : 'nav-item'}
                  aria-current={id === 'dashboard' ? 'page' : undefined}
                  onClick={onClose}
                >
                  <Icon />
                  <span>{label}</span>
                </a>
              ) : (
                <span className="nav-item planned" aria-disabled="true" title={`${label} is planned and not built yet`}>
                  <Icon />
                  <span>{label}</span>
                  <span className="soon">Planned</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <span className="sidebar-footer-title">{PRACTICE_NAME}</span>
        <span>Demo workspace · fictional data</span>
      </div>
    </aside>
  )
}
