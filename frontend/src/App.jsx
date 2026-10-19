
import { useEffect, useState } from "react";
import api from "./api";
import "./App.css";

const menuItems = [
  { name: "Dashboard", icon: "⌂" },
  { name: "Learning Programs", icon: "▤" },
  { name: "My Goals", icon: "◎" },
  { name: "Coach Feedback", icon: "✉" },
];

function App() {
  const [page, setPage] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [goals, setGoals] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [goalTitle, setGoalTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [adding, setAdding] = useState(false);

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [programResponse, goalResponse] = await Promise.all([
        api.get("programs/"),
        api.get("goals/"),
      ]);

      setPrograms(programResponse.data);
      setGoals(goalResponse.data);
    } catch (err) {
      setError(
        "Could not connect to Django. Make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function navigate(name) {
    setPage(name);
    setMenuOpen(false);
  }

  async function addGoal(event) {
    event.preventDefault();

    if (!goalTitle.trim()) return;

    setAdding(true);
    setError("");

    try {
      const response = await api.post("goals/", {
        title: goalTitle.trim(),
        deadline: deadline || null,
        status: "Pending",
      });

      setGoals((current) => [response.data, ...current]);
      setGoalTitle("");
      setDeadline("");
    } catch {
      setError("Could not save the goal. Check the Django server.");
    } finally {
      setAdding(false);
    }
  }

  async function updateGoal(goal) {
    const statuses = ["Pending", "In Progress", "Completed"];
    const nextStatus =
      statuses[(statuses.indexOf(goal.status) + 1) % statuses.length];

    setError("");

    try {
      const response = await api.patch(`goals/${goal.id}/`, {
        status: nextStatus,
      });

      setGoals((current) =>
        current.map((item) =>
          item.id === goal.id ? response.data : item
        )
      );
    } catch {
      setError("Could not update this goal.");
    }
  }

  async function deleteGoal(id) {
    if (!window.confirm("Delete this goal?")) return;

    try {
      await api.delete(`goals/${id}/`);
      setGoals((current) => current.filter((goal) => goal.id !== id));
    } catch {
      setError("Could not delete this goal.");
    }
  }

  const completed = goals.filter(
    (goal) => goal.status === "Completed"
  ).length;

  const progress = goals.length
    ? Math.round((completed / goals.length) * 100)
    : 0;

  function renderPrograms() {
    if (loading) return <p>Loading programs...</p>;

    if (!programs.length) {
      return (
        <div className="empty-state">
          <span>▤</span>
          <h3>No learning programs yet</h3>
          <p>Add sample programs through Django Admin.</p>
          <a
            href="http://127.0.0.1:8000/admin/"
            target="_blank"
            rel="noreferrer"
            className="primary-button"
          >
            Open Django Admin
          </a>
        </div>
      );
    }

    return (
      <div className="card-grid">
        {programs.map((program) => (
          <article className="program-card" key={program.id}>
            <div className="program-icon">📚</div>
            <h3>{program.title}</h3>
            <p>{program.description}</p>
            <div className="card-footer">
              <span>◷ {program.duration}</span>
              <span className="status-badge">Available</span>
            </div>
          </article>
        ))}
      </div>
    );
  }

  function renderGoals() {
    return (
      <>
        <form className="goal-form" onSubmit={addGoal}>
          <div className="form-field">
            <label htmlFor="goalTitle">Goal title</label>
            <input
              id="goalTitle"
              value={goalTitle}
              onChange={(event) => setGoalTitle(event.target.value)}
              placeholder="e.g. Improve communication skills"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="deadline">Target date (optional)</label>
            <input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
            />
          </div>

          <button className="primary-button" disabled={adding}>
            {adding ? "Adding..." : "+ Add Goal"}
          </button>
        </form>

        {goals.length === 0 ? (
          <div className="empty-state">
            <span>◎</span>
            <h3>Your goals start here</h3>
            <p>Add your first goal using the form above.</p>
          </div>
        ) : (
          <div className="goal-list">
            {goals.map((goal) => (
              <article className="goal-card" key={goal.id}>
                <div className="goal-info">
                  <h3>{goal.title}</h3>
                  <p>
                    {goal.deadline
                      ? `Target: ${goal.deadline}`
                      : "No target date"}
                  </p>
                  <span className={`status-badge ${goal.status.toLowerCase().replace(" ", "-")}`}>
                    {goal.status}
                  </span>
                </div>

                <div className="goal-actions">
                  <button
                    className="secondary-button"
                    onClick={() => updateGoal(goal)}
                    type="button"
                  >
                    Next status
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteGoal(goal.id)}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </>
    );
  }

  function renderContent() {
    if (page === "Learning Programs") {
      return (
        <>
          <div className="page-heading">
            <div>
              <h2>Learning Programs</h2>
              <p>Explore opportunities to learn and grow.</p>
            </div>
            <button className="secondary-button" onClick={loadData}>
              ↻ Refresh
            </button>
          </div>
          {renderPrograms()}
        </>
      );
    }

    if (page === "My Goals") {
      return (
        <>
          <div className="page-heading">
            <div>
              <h2>My Goals</h2>
              <p>Set goals and keep track of your development.</p>
            </div>
          </div>
          {renderGoals()}
        </>
      );
    }

    if (page === "Coach Feedback") {
      return (
        <>
          <div className="page-heading">
            <div>
              <h2>Coach Feedback</h2>
              <p>Review feedback from your coaching sessions.</p>
            </div>
          </div>
          <div className="empty-state">
            <span>✉</span>
            <h3>Feedback center</h3>
            <p>
              The feedback interface is ready for future integration
              with a coach feedback API.
            </p>
          </div>
        </>
      );
    }

    return (
      <>
        <section className="welcome-banner">
          <div>
            <span className="eyebrow">YOUR LEARNING JOURNEY</span>
            <h2>Welcome to SkillBridge!</h2>
            <p>Learn, grow, and achieve your goals.</p>
            <button
              className="primary-button"
              onClick={() => navigate("Learning Programs")}
            >
              Explore programs →
            </button>
          </div>
          <div className="banner-illustration">🎯</div>
        </section>

        <div className="stats-grid">
          <article className="stat-card">
            <span className="stat-icon purple">▤</span>
            <p>Learning Programs</p>
            <h3>{programs.length}</h3>
          </article>

          <article className="stat-card">
            <span className="stat-icon blue">◎</span>
            <p>Total Goals</p>
            <h3>{goals.length}</h3>
          </article>

          <article className="stat-card">
            <span className="stat-icon green">✓</span>
            <p>Goals Completed</p>
            <h3>{completed}</h3>
          </article>

          <article className="stat-card">
            <span className="stat-icon orange">↗</span>
            <p>Goal Progress</p>
            <h3>{progress}%</h3>
          </article>
        </div>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>Learning Programs</h2>
              <p>Discover your next learning opportunity.</p>
            </div>
            <button
              className="text-button"
              onClick={() => navigate("Learning Programs")}
            >
              View all →
            </button>
          </div>
          {renderPrograms()}
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>My Goals</h2>
              <p>Keep moving forward, one step at a time.</p>
            </div>
            <button
              className="text-button"
              onClick={() => navigate("My Goals")}
            >
              Manage goals →
            </button>
          </div>

          {goals.length ? (
            <div className="goal-list">
              {goals.slice(0, 3).map((goal) => (
                <article className="goal-card" key={goal.id}>
                  <div className="goal-info">
                    <h3>{goal.title}</h3>
                    <p>{goal.deadline || "No target date"}</p>
                  </div>
                  <span className="status-badge">{goal.status}</span>
                </article>
              ))}
            </div>
          ) : (
            <button
              className="secondary-button"
              onClick={() => navigate("My Goals")}
            >
              + Create your first goal
            </button>
          )}
        </section>
      </>
    );
  }

  return (
    <div className="app">
      {menuOpen && (
        <button
          className="mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <span className="brand-logo">S</span>
          <span>SkillBridge</span>
        </div>

        <p className="nav-label">WORKSPACE</p>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item.name}
              type="button"
              className={`nav-item ${page === item.name ? "active" : ""}`}
              onClick={() => navigate(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-avatar">L</div>
          <div>
            <strong>Learner</strong>
            <small>Personal workspace</small>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
          <div className="breadcrumb">Workspace / {page}</div>
          <button
            className="refresh-button"
            onClick={loadData}
            title="Refresh data"
          >
            ↻
          </button>
        </header>

        <div className="page-content">
          {error && (
            <div className="error-banner">
              {error}
              <button onClick={() => setError("")} aria-label="Dismiss error">
                ×
              </button>
            </div>
          )}

          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
