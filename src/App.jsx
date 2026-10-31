import { useEffect, useState } from 'react'
import { OverviewCards, PracticeActivity, UpcomingAppointments } from './DashboardWidgets.jsx'
import { MenuIcon } from './icons.jsx'
import Sidebar from './Sidebar.jsx'
import TaskTracker from './TaskTracker.jsx'
import { PRACTICE_NAME } from './demoData.js'
import { createTask, loadTasks, saveTasks, taskSummary } from './tasks.js'

const TODAY = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

export default function App() {
  const [tasks, setTasks] = useState(() => loadTasks())
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const summary = taskSummary(tasks)

  function addTask(title, priority) {
    setTasks((current) => [...current, createTask(title, priority)])
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    )
  }

  function changePriority(id, priority) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, priority } : task)))
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  return (
    <div className="layout">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} aria-hidden="true" />}

      <div className="main">
        <header className="topbar">
          <button
            type="button"
            className="icon-button menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="sidebar"
          >
            <MenuIcon />
          </button>
          <div className="topbar-title">
            <span className="topbar-practice">{PRACTICE_NAME}</span>
            <h1>Dashboard</h1>
          </div>
          <span className="topbar-date">{TODAY}</span>
        </header>

        <main id="dashboard" className="content">
          <p className="demo-banner">
            <strong>Product demo.</strong> Appointments, clients, billing, and activity are fictional sample data.
            Practice Tasks are fully working and saved in this browser.
          </p>

          <OverviewCards summary={summary} />

          <div className="dashboard-grid">
            <TaskTracker
              tasks={tasks}
              summary={summary}
              onAdd={addTask}
              onToggle={toggleTask}
              onChangePriority={changePriority}
              onDelete={deleteTask}
            />
            <div className="side-column">
              <UpcomingAppointments />
              <PracticeActivity />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
