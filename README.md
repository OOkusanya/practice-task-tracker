# Willow Therapy & Wellness | Practice Dashboard

**Product Owner & Release Manager:** [Tolu Okusanya](https://www.linkedin.com/in/tolu-okusanya/)  
**Version:** 2.0.0  
**Live Demo:** https://willow-therapy-wellness.vercel.app/  
**Project Type:** Product Management & Technology Delivery Portfolio

## Project Overview

Willow Therapy & Wellness is a portfolio demonstration of a practice-management dashboard for a **fictional therapy practice**. It combines a working administrative task tracker with a sample appointment schedule, practice metrics, and activity information.

The project demonstrates how I approach product ownership and technology delivery, taking a business problem from requirements definition through prioritization, iterative development, testing, user acceptance, and production release.

The application was developed through an AI-assisted development workflow, with product requirements, scope decisions, acceptance criteria, testing, and release approval managed by me.

> **Not a clinical system.** This demonstration does not store, process, or protect real patient information and is not designed to meet healthcare privacy requirements such as HIPAA. Do not enter real names or identifying details.

## Product Ownership & Delivery

**Role:** Product Owner & Release Manager

I led this project through the full product delivery lifecycle, establishing what the application needed to accomplish, translating those needs into testable requirements, directing iterative development, and validating the delivered functionality before release.

### Responsibilities and Decisions

- **Product definition:** Defined the business problem, product objectives, functional requirements, and scope for an administrative dashboard supporting a fictional therapy practice.
- **Prioritization and scope management:** Determined which capabilities to deliver in v2.0.0 and which to defer, distinguishing fully working functionality from planned modules.
- **Requirements and acceptance criteria:** Defined expected functionality and acceptance criteria for task management, priorities, filtering, dashboard summaries, appointment details, and browser-based persistence.
- **Development oversight:** Directed AI-assisted implementation, reviewed delivered functionality, identified defects and usability improvements, and managed refinements through iterative development.
- **Quality assurance and UAT:** Conducted six user acceptance tests to validate application functionality, business rules, data persistence, and navigation before approving the release.
- **Release management:** Approved v2.0.0 following UAT, merged the release branch into `main` through a GitHub pull request, deployed the application to Vercel, and verified functionality in production.

### Delivery Lifecycle

Requirements Definition → Scope & Prioritization → Iterative Development → Testing → User Acceptance Testing → Release Approval → Production Deployment

### Key Product Decisions

**1. Deliver working administrative task management before expanding into additional practice-management modules.**

The application prioritizes functional task management while presenting appointments, clients, billing, and settings as planned or simulated capabilities. This creates a focused, testable product without misrepresenting incomplete functionality.

**2. Make task priorities and progress immediately visible.**

High, Medium, and Low priorities, filtering, task counts, and completion metrics help users identify outstanding work and understand progress without reviewing every task individually.

**3. Preserve task changes without introducing unnecessary infrastructure.**

Browser local storage supports task persistence across refreshes without requiring accounts, a database, or a backend service. This is appropriate for the demonstration's scope, with its limitations clearly disclosed.

**4. Support repeatable demonstrations and testing.**

A reset capability restores the original sample tasks and priorities. A confirmation dialog protects against accidental loss of changes.

**5. Establish clear release acceptance criteria.**

The release required successful functional testing, validation of key user journeys, and production verification before being considered complete.

## Features

### Working Functionality

- **Practice tasks:** Add, complete, and delete administrative tasks.
- **Priorities:** High, Medium (default), or Low, set when adding tasks and changeable at any time.
- **Filters:** All, Open, Completed, and High priority, with live counts.
- **120-character limit:** A live counter; text over the limit is flagged with a clear message and cannot be saved. Text is never silently truncated.
- **Summaries:** Open, high-priority, and completed counts, a completion percentage, and remaining tasks by priority, all updating instantly.
- **Saved in the browser:** Tasks persist after a refresh using browser local storage.
- **Reset demo:** Restores the original sample tasks after confirmation.
- **Appointment details:** Select an appointment to view time, client initials, clinician, session type, duration, mode, and status (read-only).
- **Responsive layout:** Desktop, tablet, and phone, with a slide-out menu on smaller screens.
- **About this demo:** An in-app page explaining the business problem, project scope, working functionality, and limitations.

### Simulated Functionality and Data

- Today's appointments, active clients, outstanding and overdue invoices, and practice activity use fixed, fictional sample data labelled **Demo data** in the application.
- Appointments, Clients, Billing, and Settings appear in the navigation as **Planned** modules and are not implemented.

## Testing & Quality Assurance

Testing was incorporated throughout development to validate both functionality and release readiness.

### Automated Testing

The application includes automated tests covering:

- Task creation, completion, and deletion rules
- Priority assignments and updates
- 120-character validation
- Task filtering and summary calculations
- Browser storage, loading, and compatibility with tasks saved by version 1
- Consistency of the fictional appointment schedule

Additional checks include code-quality validation, production builds, and browser testing at desktop, tablet, and phone widths.

### User Acceptance Testing

**Release v2.0.0: 6 of 6 UAT tests passed.**

The approved UAT covered:

1. Appointment details modal
2. Task filtering
3. Reset demo tasks and restoration of original data
4. Task creation and input validation
5. Task persistence and updated metrics after refresh
6. About This Demo and application navigation

UAT findings were addressed and retested before release approval.

### Production Verification

Following deployment to Vercel, the live application was checked for:

- Dashboard presentation and expected sample data
- Appointment details
- Task filtering and creation
- Updated task metrics
- Task persistence after browser refresh
- Reset confirmation, cancellation, and restoration
- About This Demo content and navigation

The production checks passed.

## Release Management

### Version 2.0.0

**Status:** Released to production

**Release workflow:**

1. Completed development and testing on `feature/version-2`.
2. Executed and approved six UAT tests.
3. Created GitHub Pull Request #1 for the v2.0.0 release.
4. Merged the approved changes into `main`.
5. Deployed the production application using Vercel.
6. Completed post-deployment verification.

**Release evidence:** [GitHub Pull Request #1](https://github.com/OOkusanya/practice-task-tracker/pull/1)

**Production application:** https://willow-therapy-wellness.vercel.app/

## Technology & Development Approach

- **Frontend:** React and Vite
- **Language:** JavaScript
- **Testing:** Vitest
- **Code quality:** Oxlint
- **Version control:** Git and GitHub
- **Deployment:** Vercel
- **Data persistence:** Browser local storage
- **Development workflow:** AI-assisted implementation with human-led product ownership, testing, and release approval

The purpose of this project is to demonstrate product definition, delivery oversight, quality assurance, and release management through a working software product.

## Run It Locally

Requires [Node.js](https://nodejs.org/) 20.19 or newer (22 LTS recommended).

```bash
npm install
npm run dev
```

Then open the address shown in the terminal, usually http://localhost:5173.

To build and preview the production version:

```bash
npm run build
npm run preview
```

## Developer Testing Commands

```bash
npm test        # Automated tests (Vitest)
npm run lint    # Code-quality check (Oxlint)
npm run build   # Production build validation
```

## Demo Data & Limitations

- **No accounts, server, or database:** The application runs in the browser. Task data is not transmitted to a backend.
- **Browser-specific storage:** Tasks are saved per browser and device. They are not shared between users or devices, and clearing browser data or using a private window removes them.
- **Fixed dashboard figures:** Appointment times, counts, and statuses are fictional sample values and do not follow the real clock.
- **Fictional information:** Clients appear by initials only, and all clinicians, invoices, and activity are invented.
- **Planned modules:** Appointments, Clients, Billing, and Settings are not fully implemented.
- **Font:** Plus Jakarta Sans loads from Google Fonts. If unavailable, the application uses a system font.

## Project Structure

```text
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

## Version History

**v2.0.0 | Practice Dashboard**

- Redesigned practice dashboard
- Task priorities and filtering
- 120-character input validation
- Appointment details modal
- Reset demo functionality
- About This Demo page
- Responsive interface refinements
- UAT approval and production deployment

**v1.0.0 | Practice Task Tracker**

- Initial administrative task tracker
- Task completion and deletion
- Basic task progress tracking

---

**Portfolio Project by [Tolu Okusanya](https://www.linkedin.com/in/tolu-okusanya/)**  
Product Ownership | Technology Delivery | Program & Project Management | Release Management

**Live Demo:** https://willow-therapy-wellness.vercel.app/
