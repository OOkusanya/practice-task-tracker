// Small inline icon set (no icon library). Icons are decorative; labels carry the meaning.

function Icon({ children, size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2.5c-4.2 4.1-5.6 9.4-3.4 14.6.8 1.9 2 3.3 3.4 4.4 1.4-1.1 2.6-2.5 3.4-4.4 2.2-5.2.8-10.5-3.4-14.6z" fill="currentColor" />
        <path d="M12 7.5v13" stroke="var(--navy)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  )
}

export const DashboardIcon = () => (
  <Icon>
    <rect x="3.5" y="3.5" width="7" height="8" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="5" rx="1.5" />
    <rect x="13.5" y="11.5" width="7" height="9" rx="1.5" />
    <rect x="3.5" y="14.5" width="7" height="6" rx="1.5" />
  </Icon>
)

export const TasksIcon = () => (
  <Icon>
    <path d="M9 6.5h11M9 12h11M9 17.5h11" />
    <path d="m3.5 6.5 1.2 1.2 2.1-2.4M3.5 12l1.2 1.2 2.1-2.4M3.5 17.5l1.2 1.2 2.1-2.4" />
  </Icon>
)

export const CalendarIcon = () => (
  <Icon>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </Icon>
)

export const ClientsIcon = () => (
  <Icon>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5" />
    <path d="M16 4.7a3.5 3.5 0 0 1 0 6.6M18 14.8c1.9.7 3.2 2.5 3.5 5.2" />
  </Icon>
)

export const BillingIcon = () => (
  <Icon>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3 10h18M7 14.5h3" />
  </Icon>
)

export const SettingsIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </Icon>
)

export const MenuIcon = () => (
  <Icon size={18}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
)

export const CloseIcon = () => (
  <Icon size={18}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
)

export const TrashIcon = () => (
  <Icon size={15}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12.5a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5L18 7M9 7V4.5A1 1 0 0 1 10 3.5h4a1 1 0 0 1 1 1V7" />
  </Icon>
)

export const VideoIcon = () => (
  <Icon size={13}>
    <rect x="3" y="6" width="12.5" height="12" rx="2" />
    <path d="m15.5 10.5 5-3v9l-5-3z" />
  </Icon>
)

export const PinIcon = () => (
  <Icon size={13}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.3" />
  </Icon>
)

export const PlusIcon = () => (
  <Icon size={15}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
)

export const AlertIcon = () => (
  <Icon size={12}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.5v.01" />
  </Icon>
)

export const CheckIcon = () => (
  <Icon size={12}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icon>
)
