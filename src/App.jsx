
import { useEffect, useState } from "react";
import "./App.css";

const initialTasks = [
  { id: 1, text: "Read the React lesson", completed: true },
  { id: 2, text: "Try the counter", completed: false },
  { id: 3, text: "Update the task list", completed: false },
];

function App() {
  // E1: Counter
  const [count, setCount] = useState(0);

  // E2: Controlled input
  const [name, setName] = useState("");

  // E3: Add and remove list items
  const [newTask, setNewTask] = useState("");
  const [practiceTasks, setPracticeTasks] = useState([
    { id: 1, text: "Review component props" },
    { id: 2, text: "Practice state updates" },
    { id: 3, text: "Build something small" },
  ]);

  // E4: Show and hide content
  const [showDetails, setShowDetails] = useState(false);

  // E5: Complete and filter tasks
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("All");

  // E6: Controlled form
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // E7: Save a note with localStorage
  const [note, setNote] = useState(() => {
    return localStorage.getItem("week11-note") || "";
  });

  useEffect(() => {
    if (note.trim()) {
      localStorage.setItem("week11-note", note);
    } else {
      localStorage.removeItem("week11-note");
    }
  }, [note]);

  // E3 functions
  function addPracticeTask(e) {
    e.preventDefault();

    if (!newTask.trim()) return;

    const newItem = {
      id: Date.now(),
      text: newTask.trim(),
    };

    setPracticeTasks((previousTasks) => [
      ...previousTasks,
      newItem,
    ]);

    setNewTask("");
  }

  function removePracticeTask(id) {
    setPracticeTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  // E5 functions
  function toggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function clearCompleted() {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => !task.completed)
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Done") return task.completed;
    return true;
  });

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  // E6 function
  function handleProfileSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="app">
      <header className="topbar">
        <a href="#" className="logo">
          <span className="logo-icon">R</span>
          React<span>Lab</span>
        </a>

        <div className="topbar-right">
          <span className="status-dot"></span>
          WEEK 11.2
          <span className="topbar-divider">|</span>
          STATE & EVENTS
        </div>
      </header>

      <main className="container">
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">
              REACT DEVELOPMENT / PRACTICE 11.2
            </span>

            <h1>
              Make your interface
              <br />
              <span>come alive.</span>
            </h1>

            <p>
              Explore React state and events through seven
              interactive exercises. Change something and
              see the result instantly.
            </p>

            <div className="hero-tags">
              <span>7 Exercises</span>
              <span>React Hooks</span>
              <span>Interactive Practice</span>
            </div>
          </div>

          <div className="hero-decoration">
            <div className="hero-circle circle-one"></div>
            <div className="hero-circle circle-two"></div>
            <div className="hero-code">
              <span>const</span> interface = {"{"}
              <br />
              &nbsp;&nbsp;state: <b>"active"</b>,
              <br />
              &nbsp;&nbsp;events: <b>true</b>
              <br />
              {"}"}
            </div>
            <div className="hero-number">11.2</div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="overview">
          <div>
            <strong>07</strong>
            <span>Practice exercises</span>
          </div>
          <div>
            <strong>06</strong>
            <span>State concepts</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>Interactive</span>
          </div>
        </section>

        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR WORKSPACE</span>
            <h2>Practice playground</h2>
          </div>
          <span className="exercise-count">01 — 07</span>
        </div>

        <section className="exercise-grid">

          {/* E1 */}
          <article className="exercise-card">
            <div className="card-header">
              <span className="exercise-number">E1</span>
              <div>
                <span className="card-label">STATE MANAGEMENT</span>
                <h3>Update state with a counter</h3>
              </div>
            </div>

            <p className="card-description">
              Use functional state updates so each click
              uses the latest count.
            </p>

            <div className="demo-area counter-demo">
              <span className="demo-label">CURRENT COUNT</span>

              <div className="counter-value">{count}</div>

              <div className="button-row">
                <button
                  className="btn btn-outline"
                  onClick={() =>
                    setCount((previous) => previous - 1)
                  }
                >
                  − Decrease
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setCount((previous) => previous + 1)
                  }
                >
                  + Add one
                </button>

                <button
                  className="btn btn-ghost"
                  onClick={() => setCount(0)}
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="card-footer">
              <span>useState</span>
              <span>Functional updates</span>
            </div>
          </article>

          {/* E2 */}
          <article className="exercise-card">
            <div className="card-header">
              <span className="exercise-number">E2</span>
              <div>
                <span className="card-label">CONTROLLED INPUT</span>
                <h3>Keep an input in sync</h3>
              </div>
            </div>

            <p className="card-description">
              A controlled input stores its value in state
              and updates a preview as you type.
            </p>

            <div className="demo-area">
              <label className="field-label" htmlFor="user-name">
                Your name
              </label>

              <input
                id="user-name"
                className="form-input"
                type="text"
                placeholder="Type a name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="greeting">
                Hello, <strong>{name.trim() || "there"}</strong>!
              </div>
            </div>

            <div className="card-footer">
              <span>value</span>
              <span>onChange</span>
            </div>
          </article>

          {/* E3 */}
          <article className="exercise-card">
            <div className="card-header">
              <span className="exercise-number">E3</span>
              <div>
                <span className="card-label">ARRAY STATE</span>
                <h3>Add and remove list items</h3>
              </div>
            </div>

            <p className="card-description">
              Update arrays immutably, give each item a
              stable ID, and handle form submission.
            </p>

            <div className="demo-area">
              <form className="add-task-form" onSubmit={addPracticeTask}>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Add a practice task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />

                <button
                  className="btn btn-primary"
                  type="submit"
                >
                  Add +
                </button>
              </form>

              <div className="practice-list">
                {practiceTasks.map((task) => (
                  <div className="practice-item" key={task.id}>
                    <span>{task.text}</span>

                    <button
                      className="remove-btn"
                      onClick={() => removePracticeTask(task.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {practiceTasks.length === 0 && (
                  <p className="empty-message">
                    No tasks yet. Add your first task!
                  </p>
                )}
              </div>
            </div>

            <div className="card-footer">
              <span>Array methods</span>
              <span>map / filter</span>
            </div>
          </article>

          {/* E4 */}
          <article className="exercise-card">
            <div className="card-header">
              <span className="exercise-number">E4</span>
              <div>
                <span className="card-label">BOOLEAN STATE</span>
                <h3>Show and hide content</h3>
              </div>
            </div>

            <p className="card-description">
              Use a boolean state value to reveal optional
              content and expose the control state accessibly.
            </p>

            <div className="demo-area toggle-demo">
              <button
                className="btn btn-primary"
                onClick={() => setShowDetails((previous) => !previous)}
                aria-expanded={showDetails}
                aria-controls="extra-details"
              >
                {showDetails ? "Hide details" : "Show details"}
              </button>

              {showDetails && (
                <div className="details-panel" id="extra-details">
                  <span className="success-icon">✓</span>
                  <div>
                    <strong>React State is working!</strong>
                    <p>
                      This content is displayed conditionally
                      using boolean state.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="card-footer">
              <span>Boolean state</span>
              <span>Conditional rendering</span>
            </div>
          </article>

          {/* E5 */}
          <article className="exercise-card">
            <div className="card-header">
              <span className="exercise-number">E5</span>
              <div>
                <span className="card-label">OBJECT STATE</span>
                <h3>Complete and filter tasks</h3>
              </div>
            </div>

            <p className="card-description">
              Use object updates to mark tasks complete,
              then filter the list by status.
            </p>

            <div className="demo-area">
              <div className="filter-row">
                {["All", "Active", "Done"].map((item) => (
                  <button
                    key={item}
                    className={`filter-btn ${
                      filter === item ? "active-filter" : ""
                    }`}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="task-list">
                {filteredTasks.map((task) => (
                  <label className="task-item" key={task.id}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />

                    <span
                      className={
                        task.completed ? "task-completed" : ""
                      }
                    >
                      {task.text}
                    </span>
                  </label>
                ))}

                {filteredTasks.length === 0 && (
                  <p className="empty-message">
                    No tasks in this category.
                  </p>
                )}
              </div>

              <div className="task-bottom">
                <span>
                  {completedCount} of {tasks.length} completed
                </span>

                <button
                  className="text-btn"
                  onClick={clearCompleted}
                >
                  Clear completed
                </button>
              </div>
            </div>

            <div className="card-footer">
              <span>Object updates</span>
              <span>Array filtering</span>
            </div>
          </article>

          {/* E6 */}
          <article className="exercise-card">
            <div className="card-header">
              <span className="exercise-number">E6</span>
              <div>
                <span className="card-label">FORM HANDLING</span>
                <h3>Validate a controlled form</h3>
              </div>
            </div>

            <p className="card-description">
              Keep two fields in one object and show a
              simple message after submission.
            </p>

            <div className="demo-area">
              <form
                className="profile-form"
                onSubmit={handleProfileSubmit}
              >
                <label className="field-label" htmlFor="profile-name">
                  Name
                </label>

                <input
                  id="profile-name"
                  className="form-input"
                  type="text"
                  placeholder="Your name"
                  required
                  value={profile.name}
                  onChange={(e) => {
                    setProfile((previous) => ({
                      ...previous,
                      name: e.target.value,
                    }));
                    setSubmitted(false);
                  }}
                />

                <label className="field-label" htmlFor="profile-email">
                  Email
                </label>

                <input
                  id="profile-email"
                  className="form-input"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={profile.email}
                  onChange={(e) => {
                    setProfile((previous) => ({
                      ...previous,
                      email: e.target.value,
                    }));
                    setSubmitted(false);
                  }}
                />

                <button className="btn btn-primary" type="submit">
                  Save profile
                </button>

                {submitted && (
                  <div className="success-message" role="status">
                    ✓ Profile saved successfully, {profile.name}!
                  </div>
                )}
              </form>
            </div>

            <div className="card-footer">
              <span>Controlled fields</span>
              <span>Form submission</span>
            </div>
          </article>

          {/* E7 */}
          <article className="exercise-card">
            <div className="card-header">
              <span className="exercise-number">E7</span>
              <div>
                <span className="card-label">REACT EFFECTS</span>
                <h3>Save a note in the browser</h3>
              </div>
            </div>

            <p className="card-description">
              Use an effect to save state with localStorage
              whenever the note changes.
            </p>

            <div className="demo-area">
              <label className="field-label" htmlFor="quick-note">
                Quick note
              </label>

              <textarea
                id="quick-note"
                className="note-input"
                placeholder="Type something..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <div className="note-bottom">
                <span className={note.trim() ? "saved-status" : ""}>
                  {note.trim()
                    ? "✓ Saved in this browser"
                    : "Nothing saved yet"}
                </span>

                <button
                  className="text-btn"
                  onClick={() => setNote("")}
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="card-footer">
              <span>useEffect</span>
              <span>localStorage</span>
            </div>
          </article>

        </section>

        <footer className="footer">
          <div className="footer-logo">
            <span className="logo-icon">R</span>
            ReactLab
          </div>

          <p>Week 11.2 · React State & Events</p>

          <span className="footer-credit">
            Built for learning.
          </span>
        </footer>
      </main>
    </div>
  );
}

export default App;
