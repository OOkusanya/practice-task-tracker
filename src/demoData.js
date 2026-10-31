// Fictional sample data for the dashboard demo. No real clients, clinicians, or patient information.
// Clients are shown by initials only, matching the app's guidance not to enter identifying details.

export const PRACTICE_NAME = 'Willow Therapy & Wellness'

export const APPOINTMENT_STATUSES = {
  completed: 'Completed',
  'in-session': 'In session',
  'checked-in': 'Checked in',
  confirmed: 'Confirmed',
  unconfirmed: 'Unconfirmed',
}

export const TODAYS_APPOINTMENTS = [
  { id: 'appt-1', time: '8:00 AM', client: 'M.K.', type: 'Individual therapy', length: '50 min', mode: 'In person', clinician: 'Dr. A. Rivera', status: 'completed' },
  { id: 'appt-2', time: '9:00 AM', client: 'J.M.', type: 'Individual therapy', length: '50 min', mode: 'In person', clinician: 'Dr. A. Rivera', status: 'completed' },
  { id: 'appt-3', time: '10:00 AM', client: 'K.L.', type: 'Couples therapy', length: '80 min', mode: 'Telehealth', clinician: 'S. Patel, LMFT', status: 'in-session' },
  { id: 'appt-4', time: '11:30 AM', client: 'R.T.', type: 'Intake assessment', length: '60 min', mode: 'In person', clinician: 'Dr. A. Rivera', status: 'checked-in' },
  { id: 'appt-5', time: '1:00 PM', client: 'D.W.', type: 'Individual therapy', length: '50 min', mode: 'Telehealth', clinician: 'M. Chen, LCSW', status: 'confirmed' },
  { id: 'appt-6', time: '2:30 PM', client: 'A.S.', type: 'Family therapy', length: '60 min', mode: 'In person', clinician: 'S. Patel, LMFT', status: 'confirmed' },
  { id: 'appt-7', time: '4:00 PM', client: 'E.B.', type: 'Individual therapy', length: '50 min', mode: 'Telehealth', clinician: 'M. Chen, LCSW', status: 'unconfirmed' },
  { id: 'appt-8', time: '5:30 PM', client: 'T.N.', type: 'Group session', length: '90 min', mode: 'In person', clinician: 'Dr. A. Rivera', status: 'confirmed' },
]

// Counts for the Today's Appointments card and section, derived from the list so they always agree.
export function appointmentSummary(appointments) {
  const count = (test) => appointments.filter(test).length
  return {
    total: appointments.length,
    inPerson: count((appt) => appt.mode === 'In person'),
    telehealth: count((appt) => appt.mode === 'Telehealth'),
    completed: count((appt) => appt.status === 'completed'),
    inSession: count((appt) => appt.status === 'in-session'),
    upcoming: count((appt) => appt.status !== 'completed' && appt.status !== 'in-session'),
  }
}

export const OTHER_STATS = [
  { id: 'clients', label: 'Active Clients', value: '64', detail: '+3 new this month' },
  { id: 'invoices', label: 'Outstanding Invoices', value: '$2,340', detail: '7 invoices · 2 overdue' },
]

export const PRACTICE_ACTIVITY = [
  { id: 'act-1', kind: 'billing', text: 'Invoice #1042 paid', detail: '$180.00 · Card', time: '12 min ago' },
  { id: 'act-2', kind: 'intake', text: 'Intake forms received', detail: 'New client R.T.', time: '45 min ago' },
  { id: 'act-3', kind: 'schedule', text: 'Appointment rescheduled', detail: 'D.W. moved to 1:00 PM', time: '1 hr ago' },
  { id: 'act-4', kind: 'notes', text: 'Session note signed', detail: 'M. Chen, LCSW', time: '2 hr ago' },
  { id: 'act-5', kind: 'billing', text: 'Insurance claim submitted', detail: 'Claim #C-2291', time: 'Yesterday' },
]
