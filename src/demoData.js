// Fictional sample data for the dashboard demo. No real clients, clinicians, or patient information.
// Clients are shown by initials only, matching the app's guidance not to enter identifying details.

export const PRACTICE_NAME = 'Willow Therapy & Wellness'

export const OVERVIEW_STATS = [
  { id: 'appointments', label: "Today's Appointments", value: '8', detail: '5 in person · 3 telehealth' },
  { id: 'clients', label: 'Active Clients', value: '64', detail: '+3 new this month' },
  { id: 'invoices', label: 'Outstanding Invoices', value: '$2,340', detail: '7 invoices · 2 overdue' },
]

export const UPCOMING_APPOINTMENTS = [
  { id: 'appt-1', time: '9:00 AM', client: 'J.M.', type: 'Individual therapy', length: '50 min', mode: 'In person', clinician: 'Dr. A. Rivera' },
  { id: 'appt-2', time: '10:00 AM', client: 'K.L.', type: 'Couples therapy', length: '80 min', mode: 'Telehealth', clinician: 'S. Patel, LMFT' },
  { id: 'appt-3', time: '11:30 AM', client: 'R.T.', type: 'Intake assessment', length: '60 min', mode: 'In person', clinician: 'Dr. A. Rivera' },
  { id: 'appt-4', time: '1:00 PM', client: 'D.W.', type: 'Individual therapy', length: '50 min', mode: 'Telehealth', clinician: 'M. Chen, LCSW' },
  { id: 'appt-5', time: '2:30 PM', client: 'A.S.', type: 'Family therapy', length: '60 min', mode: 'In person', clinician: 'S. Patel, LMFT' },
]

export const PRACTICE_ACTIVITY = [
  { id: 'act-1', kind: 'billing', text: 'Invoice #1042 paid', detail: '$180.00 · Card', time: '12 min ago' },
  { id: 'act-2', kind: 'intake', text: 'Intake forms received', detail: 'New client R.T.', time: '45 min ago' },
  { id: 'act-3', kind: 'schedule', text: 'Appointment rescheduled', detail: 'D.W. moved to 1:00 PM', time: '1 hr ago' },
  { id: 'act-4', kind: 'notes', text: 'Session note signed', detail: 'M. Chen, LCSW', time: '2 hr ago' },
  { id: 'act-5', kind: 'billing', text: 'Insurance claim submitted', detail: 'Claim #C-2291', time: 'Yesterday' },
]
