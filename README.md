# Willow Therapy & Wellness — Practice Dashboard

A portfolio demo of a practice-management dashboard for a **fictional** therapy practice. It pairs a fully working administrative task tracker with a sample schedule, practice figures, and activity feed, and it is used to show how a small product moves from written requirements through iterative development, testing, and release.

> **Not a clinical system.** This demo does not store, process, or protect real patient information and is not designed to meet healthcare privacy requirements such as HIPAA. Do not enter real names or identifying details.

## Features

**Working**

- **Practice tasks:** add, complete, and delete administrative tasks.
- **Priorities:** High, Medium (default), or Low, set when adding and changeable at any time.
- **Filters:** All, Open, Completed, and High priority, with live counts.
- **120-character limit:** a live counter; text over the limit is flagged with a clear message and cannot be saved (it is never silently cut off).
- **Summaries:** open, high-priority, and completed counts, a completion percentage, and remaining tasks by priority, all updating instantly.
- **Saved in the browser:** tasks persist after a refresh using the browser's local storage.
- **Reset demo:** restores the original sample tasks after a confirmation.
- **Appointment details:** select any appointment to see time, client initials, clinician, session type, duration, mode, and status (read-only).
- **Responsive layout:** desktop, tablet, and phone, with a slide-out menu on smaller screens.
- **About this demo:** an in-app page explaining the project and its limits.

**Simulated (demo data)**

- Today's appointments, active clients, outstanding and overdue invoices, and practice activity are fixed, fictional sample data, labelled **Demo data** in the app.
- Appointments, Clients, Billing, and Settings appear in the menu as **Planned** and are not built.

## Run it locally

Requires [Node.js](https://nodejs.org/) 20.19 or newer (22 LTS recommended).

```bash
npm install
npm run dev
```

Then open the address shown in the terminal (usually http://localhost:5173).

To build and preview the production version:

```bash
npm run build
npm run preview
```

## Testing

```bash
npm test        # automated tests (Vitest)
npm run lint    # code-quality check (oxlint)
npm run build   # confirms the app builds
```

The automated tests cover the task rules (adding, priorities, the 120-character limit, filters, summaries, saving and loading, and upgrading tasks saved by version 1) and the consistency of the demo schedule. Layouts and interactions are also checked in a browser at desktop, tablet, and phone widths before each release.

## Demo data and limitations

- **No accounts, server, or database.** Everything runs in the browser; nothing is sent anywhere.
- **Tasks are stored per browser and device.** They are not shared between people or devices, and clearing browser data or using a private window removes them.
- **Dashboard figures do not change.** Appointment times, counts, and statuses are fixed sample values and do not follow the real clock.
- **Clients appear by initials only**, and all clinicians, invoices, and activity are invented.
- **Font:** Plus Jakarta Sans loads from Google Fonts; without a connection the app falls back to the system font and works normally.

## Project structure

```
src/
  App.jsx               Page layout, navigation, and task state
  DashboardWidgets.jsx  Summary cards, appointments, tasks widget, activity
  TaskTracker.jsx       Tasks page: form, filters, list, overview, reset
  About.jsx             About this demo page
  Modal.jsx             Accessible pop-up used for details and confirmations
  Sidebar.jsx           Brand and navigation
  tasks.js              Task rules, saving, and summaries (tested)
  demoData.js           Fictional sample data (tested)
```

## Version history

- **2.0.0:** dashboard redesign, priorities, filters, 120-character validation, appointment details, reset demo, About page.
- **1.0.0:** simple practice task tracker with completion, deletion, and progress.
