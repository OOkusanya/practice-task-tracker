import { useEffect, useState } from 'react'
import {
  OverviewCards,
  PracticeActivity,
  TasksWidget,
  TodaysAppointments,
} from './DashboardWidgets.jsx'
import { MenuIcon } from './icons.jsx'
import Sidebar from './Sidebar.jsx'
import TaskTracker from './TaskTracker.jsx'
import { PRACTICE_NAME } from './demoData.js'
import { createTask, loadTasks, saveTasks, taskSummary } from './tasks.js'

const TODAY = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

const VIEWS = {
  dashboard: { title: 'Dashboard', page: 'Dashboard · Willow Therapy & Wellness' },
  tasks: { title: 'Tasks', page: 'Tasks · Willow Therapy & Wellness' },
}

// The two built pages are switched with the address hash (#tasks), so the browser Back button works.
function viewFromHash() {
  return window.location.hash === '#tasks' ? 'tasks' : 'dashboard'
}

export default function App() {
  const [tasks, setTasks] = useState(() => loadTasks())
  const [view, setView] = useState(viewFromHash)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  useEffect(() => {
    const onHashChange = () => {
      setView(viewFromHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.title = VIEWS[view].page
  }, [view])

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
      <Sidebar view={view} open={menuOpen} onClose={() => setMenuOpen(false)} />
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
            <h1>{VIEWS[view].title}</h1>
          </div>
          <span className="topbar-date">{TODAY}</span>
        </header>

        {view === 'tasks' ? (
          <main className="content content-narrow">
            <TaskTracker
              tasks={tasks}
              summary={summary}
              onAdd={addTask}
              onToggle={toggleTask}
              onChangePriority={changePriority}
              onDelete={deleteTask}
            />
          </main>
        ) : (
          <main className="content">
            <p className="demo-banner">
              <strong>Product demo.</strong> Appointments, clients, billing, and activity are fictional sample
              data. Practice Tasks are fully working and saved in this browser.
            </p>
            <OverviewCards summary={summary} />
            <TodaysAppointments />
            <div className="support-grid">
              <TasksWidget tasks={tasks} summary={summary} onToggle={toggleTask} />
              <PracticeActivity />
            </div>
          </main>
        )}
      </div>
    </div>
  )
}
