import { useNavigate } from "react-router-dom";


function home() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  return (
    <div className="home">

      <nav className="navbar">
        <h2>💰 Wallet-Notes</h2>

        <div>
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <h1>
            Track Expenses,
            Save Money &
            Manage Notes
          </h1>

          <p>
            Wallet-Notes helps you manage daily expenses,
            savings goals, spending limits and important notes
            all in one place.
          </p>

          <button
            className="hero-btn"
            onClick={() => navigate("/register")}
          >
            Get Started Free
          </button>
        </div>

        <div className="hero-right">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
            alt=""
          />
        </div>
      </section>

      <section className="features">

        <div className="feature-card">
          <h3>💸 Expense Tracking</h3>
          <p>Monitor daily expenses easily.</p>
        </div>

        <div className="feature-card">
          <h3>🎯 Saving Goals</h3>
          <p>Create and achieve savings targets.</p>
        </div>

        <div className="feature-card">
          <h3>📝 Notes Manager</h3>
          <p>Store personal finance notes.</p>
        </div>

        <div className="feature-card">
          <h3>📊 Budget Control</h3>
          <p>Set monthly spending limits.</p>
        </div>

      </section>

      <section className="about">
        <h2>Why Choose Wallet-Notes?</h2>

        <p>
          Wallet-Notes is an all-in-one personal finance
          management system that allows users to track expenses,
          manage savings goals, maintain notes, and control
          spending limits through a simple dashboard.
        </p>
      </section>

      <footer>
        <h3>Wallet-Notes © 2026</h3>
      </footer>

    </div>
  );
}

export default home;