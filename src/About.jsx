import { PRACTICE_NAME } from './demoData.js'

export default function About() {
  return (
    <div className="about">
      <section className="card about-intro" aria-labelledby="about-title">
        <span className="pill pill-demo">Portfolio demo</span>
        <h2 id="about-title">About this demo</h2>
        <p>
          {PRACTICE_NAME} is a fictional therapy practice. This dashboard is a portfolio project that shows how a
          small product goes from a written requirement to a tested release. It is <strong>not</strong> a
          production clinical system.
        </p>
      </section>

      <div className="about-grid">
        <section className="card" aria-labelledby="about-problem">
          <h3 id="about-problem">The business problem</h3>
          <p>
            Small therapy practices juggle administrative work, such as insurance renewals, billing reviews,
            supplies, and training, alongside a full clinical schedule. Those to-dos often live in notebooks or
            inboxes, so it is hard to see what matters most today and what is falling behind.
          </p>
        </section>

        <section className="card" aria-labelledby="about-working">
          <h3 id="about-working">What works</h3>
          <ul>
            <li>Practice tasks: add, complete, delete, and set High, Medium, or Low priority</li>
            <li>Filters for All, Open, Completed, and High priority tasks</li>
            <li>120-character limit with a live counter and clear feedback</li>
            <li>Progress and priority summaries that update instantly</li>
            <li>Tasks saved in this browser, with a Reset demo option</li>
            <li>Read-only appointment details for the sample schedule</li>
          </ul>
        </section>

        <section className="card" aria-labelledby="about-simulated">
          <h3 id="about-simulated">What is simulated</h3>
          <ul>
            <li>Appointments, client counts, invoices, and practice activity are fictional sample data</li>
            <li>Clients appear by initials only; clinicians and figures are invented</li>
            <li>Appointments, Clients, Billing, and Settings are planned modules, not built</li>
            <li>No accounts, server, or database: nothing leaves this browser</li>
          </ul>
        </section>

        <section className="card" aria-labelledby="about-demonstrates">
          <h3 id="about-demonstrates">What this project demonstrates</h3>
          <ul>
            <li>
              <strong>Product requirements:</strong> features written as numbered requirements with clear
              acceptance criteria
            </li>
            <li>
              <strong>Iterative development:</strong> from a simple task list (version 1) to priorities, a
              dashboard redesign, and refinements (version 2)
            </li>
            <li>
              <strong>Testing:</strong> automated tests, browser checks on desktop and mobile, and user
              acceptance testing that found and fixed a silent 120-character cut-off
            </li>
            <li>
              <strong>Release management:</strong> a dedicated feature branch, small descriptive commits, and
              tests, lint, and build checks run before every push
            </li>
          </ul>
        </section>
      </div>

      <p className="about-disclaimer">
        Not for clinical use. This demo does not store, process, or protect real patient information and is not
        designed to meet healthcare privacy requirements such as HIPAA. Please do not enter real names or
        identifying details.
      </p>
    </div>
  )
}
