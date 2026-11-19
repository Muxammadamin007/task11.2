import { useState } from 'react'
import './App.css'

const courses = [
  { id: 1, category: 'Design', title: 'UI/UX Design Masterclass', author: 'Sophie Moore', lessons: 24, duration: '8h 40m', level: 'Intermediate', color: 'violet', icon: '✦' },
  { id: 2, category: 'Development', title: 'Modern Web Development', author: 'Daniel Carter', lessons: 32, duration: '12h 15m', level: 'Advanced', color: 'orange', icon: '⌘' },
  { id: 3, category: 'Marketing', title: 'Digital Marketing Strategy', author: 'Olivia Wilson', lessons: 18, duration: '6h 20m', level: 'Beginner', color: 'green', icon: '↗' },
  { id: 4, category: 'Business', title: 'Building a Startup from Zero', author: 'Marcus Lee', lessons: 21, duration: '7h 45m', level: 'Intermediate', color: 'blue', icon: '◆' },
]

const schedule = [
  { time: '09:00', title: 'Design systems', type: 'Live class' },
  { time: '11:30', title: 'React patterns', type: 'Workshop' },
  { time: '14:00', title: 'Brand strategy', type: 'Mentoring' },
]

function App() {
  const [category, setCategory] = useState('All courses')
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState([])

  const visibleCourses = courses.filter((course) => {
    const matchesCategory = category === 'All courses' || course.category === category
    const matchesQuery = course.title.toLowerName?.() || course.title.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  const toggleSaved = (id) => {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#top" aria-label="Acadia home">
          <span className="brand-mark">A</span>
          <span>ACADIA</span>
        </a>

        <nav className="side-nav" aria-label="Primary navigation">
          <a className="active" href="#top"><span>⌂</span> Overview</a>
          <a href="#courses"><span>▦</span> My courses</a>
          <a href="#schedule"><span>◷</span> Schedule</a>
          <a href="#courses"><span>♡</span> Saved</a>
        </nav>

        <div className="side-bottom">
          <a href="#settings"><span>⚙</span> Settings</a>
          <div className="profile">
            <div className="avatar">AM</div>
            <div><strong>Alex Morgan</strong><small>Student</small></div>
            <button aria-label="Open profile menu">•••</button>
          </div>
        </div>
      </aside>

      <section className="main-area" id="top">
        <header className="topbar">
          <button className="menu-button" aria-label="Open menu">☰</button>
          <div className="search-box">
            <span>⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search courses" aria-label="Search courses" />
          </div>
          <button className="notification" aria-label="Notifications">♢<i /></button>
        </header>

        <div className="content">
          <section className="hero-card">
            <div className="hero-copy">
              <span className="eyebrow">LEARNING JOURNEY</span>
              <h1>Grow your skills.<br /><em>Shape your future.</em></h1>
              <p>Learn from industry experts and build projects that matter.</p>
              <button className="primary-button" onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}>Explore courses <span>→</span></button>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orbit orbit-one"></div>
              <div className="orbit orbit-two"></div>
              <div className="student-figure">
                <div className="head"></div>
                <div className="body"></div>
                <div className="laptop"><span>✦</span></div>
              </div>
              <div className="floating-card progress-card"><span>●</span><div><strong>78%</strong><small>Progress</small></div></div>
              <div className="floating-card lesson-card"><strong>12</strong><small>Lessons</small></div>
            </div>
          </section>

          <section className="stats-row" aria-label="Learning statistics">
            <article><span className="stat-icon coral">▶</span><div><strong>18</strong><small>Courses in progress</small></div></article>
            <article><span class="stat-icon mint">✓</span><div><strong>42</strong><small>Completed lessons</span></small></div></article>
            <article><span className="stat-icon gold">◷</span><div><strong>16h</strong><small>Learning time</small></div></article>
          </section>

          <div className="section-heading" id="courses">
            <div><span className="eyebrow">DISCOVER</span><h2>Popular courses</h2></div>
            <a href="#courses">View all <span>→</span></a>
          </div>

          <div className="filters" role="group" aria-label="Course categories">
            {['All courses', 'Design', 'Development', 'Marketing', 'Business'].map((item) => (
              <button key={item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>

          <div className="course-layout">
            <div className="course-grid">
              {visibleCourses.map((course) => (
                <article className="course-card" key={course.id}>
                  <div className={`course-cover ${course.color}`}>
                    <span className="course-symbol">{course.icon}</span>
                    <button className={saved.includes(course.id) ? 'saved' : ''} onClick={() => toggleSaved(course.id)} aria-label="Save course">♡</button>
                  </div>
                  <div className="course-info">
                    <span className="course-category">{course.category}</span>
                    <h3>{course.title}</h3>
                    <p>by {course.author}</p>
                    <div className="course-meta"><span>▤ {course.lessons} lessons</span><span>◷ {course.duration}</span></div>
                  </div>
                </article>
              ))}
              {visibleCourses.length === 0 && <p className="empty-state">No courses match your search.</p>}
            </div>

            <aside className="schedule-card" id="schedule">
              <div className="schedule-header"><div><span className="eyebrow">TODAY</span><h3>Schedule</h3></div><button aria-label="More schedule options">•••</button></div>
              <div className="date-strip">
                {['18', '19', '20', '21', '22'].map((day, index) => <button className={index === 2 ? 'today' : ''} key={day}><small>{['S', 'M', 'T', 'W', 'T'][index]}</small><strong>{day}</strong></button>)}
              </div>
              <div className="schedule-list">
                {schedule.map((item) => (
                  <article key={item.time}><time>{item.time}</time><div><small>{item.type}</small><strong>{item.title}</strong></div></article>
                ))}
              </div>
              <button className="calendar-button">View full schedule</button>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
