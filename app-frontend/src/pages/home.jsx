import { useState } from "react";
import Login from "./login";
import Register from "./login&page";

function Home() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    return (
        <>
            <div className="home-container">

                <nav className="navbar">
                    <div className="logo">
                        💰 <span>Wallet Notes</span>
                    </div>

                    <div className="nav-btns">
                        <button
                            className="login-btn"
                            onClick={() => setShowLogin(true)}
                        >
                            Login
                        </button>

                        <button
                            className="register-btn"
                            onClick={() => setShowRegister(true)}
                        >
                            Register
                        </button>
                    </div>
                </nav>

                <section className="hero">

                    <div className="hero-left">
                        <h1>
                            Smart Expense <br />
                            Tracking Made Easy
                        </h1>

                        <p>
                            Manage expenses, savings goals, notes,
                            and monthly budgets in one beautiful dashboard.
                        </p>

                        <button
                            className="hero-btn"
                            onClick={() => setShowRegister(true)}
                        >
                            Get Started Free
                        </button>
                    </div>

                    <div className="hero-right">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135706.png"
                            alt="Finance Management"
                            className="hero-image"
                        />
                    </div>

                </section>

                <section className="features">

                    <div className="feature-card">
                        <h2>💸</h2>
                        <h3>Expense Tracking</h3>
                        <p>Track every expense and manage spending.</p>
                    </div>

                    <div className="feature-card">
                        <h2>🎯</h2>
                        <h3>Saving Goals</h3>
                        <p>Create goals and achieve financial targets.</p>
                    </div>

                    <div className="feature-card">
                        <h2>📝</h2>
                        <h3>Notes Manager</h3>
                        <p>Store personal finance notes securely.</p>
                    </div>

                    <div className="feature-card">
                        <h2>📊</h2>
                        <h3>Budget Control</h3>
                        <p>Set spending limits and control budgets.</p>
                    </div>

                </section>

                <section className="stats">

                    <div className="stat-card">
                        <h2>10K+</h2>
                        <p>Active Users</p>
                    </div>

                    <div className="stat-card">
                        <h2>50K+</h2>
                        <p>Expenses Managed</p>
                    </div>

                    <div className="stat-card">
                        <h2>5K+</h2>
                        <p>Saving Goals</p>
                    </div>

                </section>

                <footer>
                    <h3>Wallet Note Tracker</h3>

                    <p>
                        Track • Save • Achieve
                    </p>

                    <p className="developer">
                        Developed By ❤️ Shrishail Chicholi
                    </p>

                    <p className="copyright">
                        © 2026 Wallet Note Tracker. All Rights Reserved.
                    </p>
                </footer>

            </div>

            {showLogin && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <button
                            className="close-btn"
                            onClick={() => setShowLogin(false)}
                        >
                            ✖
                        </button>

                        <Login />
                    </div>
                </div>
            )}

            {showRegister && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <button
                            className="close-btn"
                            onClick={() => setShowRegister(false)}
                        >
                            ✖
                        </button>

                        <Register />
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;