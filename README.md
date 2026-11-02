
# Willow Therapy & Wellness | Practice Dashboard

**Product Owner & Release Manager:** Tolu Okusanya  
**Version:** 2.0.0  
**Live Demo:** https://willow-therapy-wellness.vercel.app/  
**Project Type:** Product Management & Technology Delivery Portfolio

## Project Overview

Willow Therapy & Wellness is a portfolio demonstration of a practice-management dashboard for a **fictional** therapy practice. It combines a working administrative task tracker with a sample appointment schedule, practice metrics, and activity information.

The project demonstrates how I approach product ownership and technology delivery, taking a business problem from requirements definition through prioritization, iterative development, testing, user acceptance, and production release.

The application was developed through an AI-assisted development workflow, with product requirements, scope decisions, acceptance criteria, testing, and release approval managed by me.

> **Not a clinical system.** This demonstration does not store, process, or protect real patient information and is not designed to meet healthcare privacy requirements such as HIPAA. Do not enter real names or identifying details.

## Product Ownership & Delivery

**Role:** Product Owner & Release Manager

I led this project through the product delivery lifecycle, establishing what the application needed to accomplish, translating those needs into testable requirements, directing iterative development, and validating delivered functionality before release.

### Responsibilities and Decisions

- **Product definition:** Defined the business problem, product objectives, functional requirements, and scope for an administrative dashboard supporting a fictional therapy practice.
- **Prioritization and scope management:** Determined which capabilities to deliver in v2.0.0 and which to defer, distinguishing fully working functionality from planned modules.
- **Requirements and acceptance criteria:** Defined expected functionality for task management, priorities, filtering, dashboard summaries, appointment details, and browser-based persistence. The structured backlog below documents these behaviors using Given/When/Then criteria.
- **Development oversight:** Directed AI-assisted implementation, reviewed delivered functionality, identified defects and usability improvements, and managed refinements through iterative development.
- **Quality assurance and UAT:** Conducted six user acceptance tests to validate application functionality, business rules, data persistence, and navigation before approving the release.
- **Release management:** Approved v2.0.0 following UAT, merged the release branch into `main` through a GitHub pull request, deployed the application to Vercel, and verified functionality in production.

### Delivery Lifecycle

Requirements Definition → Scope & Prioritization → Iterative Development → Testing → User Acceptance Testing → Release Approval → Production Deployment

### Key Product Decisions

1. **Deliver working administrative task management before expanding into additional practice-management modules.** The application prioritizes functional task management while presenting appointments, clients, billing, and settings as planned or simulated capabilities. This creates a focused, testable product without misrepresenting incomplete functionality.
2. **Make task priorities and progress immediately visible.** High, Medium, and Low priorities, filtering, task counts, and completion metrics help users identify outstanding work and understand progress without reviewing every task individually.
3. **Preserve task changes without introducing unnecessary infrastructure.** Browser local storage supports task persistence across refreshes without requiring accounts, a database, or a backend service. This is appropriate for the demonstration's scope, with its limitations clearly disclosed.
4. **Support repeatable demonstrations and testing.** A reset capability restores the original sample tasks and priorities. A confirmation dialog protects against accidental loss of changes.
5. **Establish clear release acceptance criteria.** The release required successful functional testing, validation of key user journeys, and production verification before being considered complete.

## Product Backlog: Epic → Features → User Stories

**Epic: Willow Therapy & Wellness Practice Dashboard**  
**Epic objective:** Provide a centralized demonstration interface for administrative task management, visibility into practice activity, and navigation to practice information.

The stories below are **retrospectively structured from the implemented functionality and documented release scope**. They are not represented as verbatim historical tickets. Acceptance criteria describe the intended behavior; the six executed UAT cases are recorded separately under Testing & Quality Assurance.

### Feature 1: Administrative Task Management

| ID | User story | Acceptance criteria (Given / When / Then) |
| --- | --- | --- |
| **US-001** | **As a** practice administrator, **I want** to create tasks **so that** I can track administrative work. | **AC1:** Given I am on the Tasks page, when I enter a valid description and add a task, then the task appears with Open status and summary counts update.<br>**AC2:** Given I am entering a description, when it exceeds 120 characters, then a validation message appears and the task cannot be saved; the text is not silently truncated. |
| **US-002** | **As a** practice administrator, **I want** to assign and change priorities **so that** I can focus on urgent work. | **AC1:** Given I am creating a task, when I select High, Medium, or Low, then the task saves with that priority.<br>**AC2:** Given I leave the default selection unchanged, when I add the task, then its priority is Medium.<br>**AC3:** Given an existing task, when I change its priority, then the displayed priority and relevant summaries update. |
| **US-003** | **As a** practice administrator, **I want** to complete and delete tasks **so that** my task list reflects outstanding work. | **AC1:** Given an Open task, when I mark it complete, then it is shown as Completed and summary counts update.<br>**AC2:** Given an existing task, when I delete it, then it is removed and task counts recalculate. |
| **US-004** | **As a** practice administrator, **I want** to filter tasks **so that** I can focus on the relevant subset. | **AC1:** Given tasks in multiple statuses, when I select Open or Completed, then only tasks matching that status appear.<br>**AC2:** Given tasks with multiple priorities, when I select High Priority, then only high-priority tasks appear.<br>**AC3:** Given an active filter, when I select All, then all tasks appear. |

### Feature 2: Practice Dashboard and Visibility

| ID | User story | Acceptance criteria (Given / When / Then) |
| --- | --- | --- |
| **US-005** | **As a** practice administrator, **I want** task summaries **so that** I can monitor workload and completion. | **AC1:** Given task data exists, when I view the dashboard, then Open, High Priority, and Completed counts and completion percentage are displayed.<br>**AC2:** Given I change a task, when the change is applied, then affected task summaries update without a manual refresh. |
| **US-006** | **As a** practice administrator, **I want** to inspect scheduled appointment details **so that** I can review information without leaving the dashboard. | **AC1:** Given the sample schedule is displayed, when I select an appointment, then a read-only detail dialog shows time, client initials, clinician, session type, duration, mode, and status.<br>**AC2:** Given the dialog is open, when I close it, then I return to the dashboard. |

### Feature 3: Data Persistence and Demo Management

| ID | User story | Acceptance criteria (Given / When / Then) |
| --- | --- | --- |
| **US-007** | **As a** practice administrator, **I want** task changes retained **so that** a browser refresh does not erase my work. | **AC1:** Given I have modified tasks, when I refresh the page, then the saved task state is restored and metrics match it.<br>**AC2:** Given saved data exists in the same browser's local storage, when I reopen the application with that storage intact, then the saved tasks load. |
| **US-008** | **As a** demo user, **I want** to restore the initial sample tasks **so that** I can repeat a demonstration or test. | **AC1:** Given the task list has changed, when I select Reset Demo, then a confirmation appears.<br>**AC2:** Given the confirmation is displayed, when I confirm, then the original sample tasks and priorities return and metrics recalculate.<br>**AC3:** Given the confirmation is displayed, when I cancel, then existing task data remains unchanged. |

### Feature 4: Application Navigation and Usability

| ID | User story | Acceptance criteria (Given / When / Then) |
| --- | --- | --- |
| **US-009** | **As a** demo user, **I want** to understand the app's scope **so that** I can distinguish working features from simulated modules. | **AC1:** Given I am in the application, when I open About This Demo, then I can read the business problem, scope, working functionality, and limitations. |
| **US-010** | **As a** demo user, **I want** the interface to work across screen sizes **so that** I can navigate on desktop or mobile. | **AC1:** Given I use a small screen, when I open the navigation control, then the slide-out navigation is available.<br>**AC2:** Given I load the application at desktop, tablet, or phone width, when the page renders, then the layout adapts to the viewport. |

**Scope note:** Appointments, Clients, Billing, and Settings are not fully implemented modules. Sample appointment details are read-only. The backlog does not imply a real scheduling, billing, or patient-records workflow.

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

### User Acceptance Testing — v2.0.0

**Recorded outcome: 6 of 6 UAT scenarios passed.** The six scenario names and overall pass result were documented for the release. The **test steps and expected results below are reconstructed** from the recorded scope and app behavior to make the evidence easier to review; they are not presented as an original execution transcript or a claim that every sub-step was separately logged.

| Test case | Test steps | Expected results | Pass/Fail | Comments |
| --- | --- | --- | --- | --- |
| **TC-001 — Appointment details modal** | 1. Open the application dashboard.<br>2. Locate the sample appointment schedule.<br>3. Select an appointment.<br>4. Verify each field in the details dialog.<br>5. Close the dialog. | A read-only dialog opens with time, client initials, clinician, session type, duration, mode, and status; closing it returns to the dashboard. | **Pass** | UAT scenario 1; fictional appointment data. |
| **TC-002 — Task filtering** | 1. Open the Tasks page.<br>2. Select the Open filter and inspect the results.<br>3. Select the Completed filter and inspect the results.<br>4. Select the High Priority filter and inspect the results.<br>5. Select All and inspect the full list. | Each filter displays only matching tasks; All restores the full list; displayed counts remain consistent. | **Pass** | UAT scenario 2; status and priority filters. |
| **TC-003 — Reset demo data** | 1. Open the Tasks page.<br>2. Add a task or change an existing task.<br>3. Select Reset Demo.<br>4. Select Cancel in the confirmation dialog.<br>5. Verify the changes remain.<br>6. Select Reset Demo again.<br>7. Confirm the reset.<br>8. Verify original sample tasks, priorities, and metrics are restored. | Cancel retains the modified data; confirming reset restores original sample data and recalculates summaries. | **Pass** | UAT scenario 3; reset confirmation and restoration. |
| **TC-004 — Task creation and validation** | 1. Open the Tasks page.<br>2. Enter a valid task description of 120 characters or fewer.<br>3. Select a priority and add the task.<br>4. Verify the task appears in the list.<br>5. Enter a description longer than 120 characters.<br>6. Attempt to add the over-limit task.<br>7. Verify the validation feedback and task list. | A valid task is created with its selected priority; an over-limit description produces feedback, is not saved, and is not silently truncated. | **Pass** | UAT scenario 4; task input rules. |
| **TC-005 — Persistence and metrics** | 1. Open the Tasks page.<br>2. Create a task or modify an existing task.<br>3. Record the task status, priority, and displayed summary metrics.<br>4. Refresh the browser page.<br>5. Return to the Tasks page if necessary.<br>6. Verify the task change and compare summary metrics with the pre-refresh values. | Changes persist after refresh in the same browser; summary metrics reflect the restored task state. | **Pass** | UAT scenario 5; browser local storage, not server-side storage. |
| **TC-006 — About page and navigation** | 1. Open the application.<br>2. Navigate to About This Demo.<br>3. Verify that the purpose, scope, working features, and limitations are described.<br>4. Navigate back to the dashboard and Tasks page.<br>5. Reduce the browser width to a mobile-sized viewport or open on a phone.<br>6. Open the mobile navigation menu and select an available page.<br>7. Verify planned modules are labeled appropriately. | About content is accessible; working-page navigation functions; mobile menu is usable; planned modules are clearly distinguished from working features. | **Pass** | UAT scenario 6; navigation and scope disclosure. |

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

Release workflow:

1. Completed development and testing on `feature/version-2`.
2. Executed and approved six UAT tests.
3. Created [GitHub Pull Request #1](https://github.com/OOkusanya/practice-task-tracker/pull/1) for the v2.0.0 release.
4. Merged the approved changes into `main`.
5. Deployed the production application using Vercel.
6. Completed post-deployment verification.

**Release evidence:** [GitHub Pull Request #1 — Release v2.0.0: Willow Therapy & Wellness Practice Dashboard](https://github.com/OOkusanya/practice-task-tracker/pull/1)  
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

Then open the address shown in the terminal, usually `http://localhost:5173`.

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

Portfolio Project by **Tolu Okusanya**  
Product Ownership | Technology Delivery | Program & Project Management | Release Management  

**Live Demo:** https://willow-therapy-wellness.vercel.app/
