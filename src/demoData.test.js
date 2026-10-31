import { describe, expect, it } from 'vitest'
import { APPOINTMENT_STATUSES, TODAYS_APPOINTMENTS, appointmentSummary } from './demoData.js'

describe('appointmentSummary', () => {
  it('matches the demo schedule', () => {
    expect(appointmentSummary(TODAYS_APPOINTMENTS)).toEqual({
      total: 8,
      inPerson: 5,
      telehealth: 3,
      completed: 2,
      inSession: 1,
      upcoming: 5,
      unconfirmed: 1,
    })
  })

  it('gives every demo appointment a known status and initials-only client', () => {
    for (const appt of TODAYS_APPOINTMENTS) {
      expect(Object.keys(APPOINTMENT_STATUSES)).toContain(appt.status)
      expect(appt.client).toMatch(/^([A-Z]\.){2}$/)
    }
  })
})
