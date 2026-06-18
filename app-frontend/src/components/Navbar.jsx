import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [showExpenses, setShowExpenses] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [showReports, setShowReports] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="side-nav">

      <div className="profile-nav">
        <img
          src={
            user?.profileImage
              ? `http://localhost:6060${user.profileImage}`
              : "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
          }
          alt="Profile"
          className="nav-profile-img"
        />

        <h3 className="user-name">
          {user?.name || "User"}
        </h3>
      </div>

      <h1>Wallet Notes</h1>

      <nav>
        <ul>

          <li>
            <Link to="/dashboard">🏠 Dashboard</Link>
          </li>

          {/* Expenses */}
          <li
            className="menu-title"
            onClick={() =>
              setShowExpenses(!showExpenses)
            }
          >
            💸 Expenses ▼
          </li>

          {showExpenses && (
            <ul className="submenu">
              <li>
                <Link to="/expenses/all">
                  All Expenses
                </Link>
              </li>

              <li>
                <Link to="/expenses/add">
                  Add Expense
                </Link>
              </li>
            </ul>
          )}

          {/* Notes */}
          <li
            className="menu-title"
            onClick={() =>
              setShowNotes(!showNotes)
            }
          >
            📝 Notes ▼
          </li>

          {showNotes && (
            <ul className="submenu">
              <li>
                <Link to="/notes/all">
                  All Notes
                </Link>
              </li>

              <li>
                <Link to="/notes/add">
                  Add Note
                </Link>
              </li>
            </ul>
          )}

          {/* Goals */}
          <li
            className="menu-title"
            onClick={() =>
              setShowGoals(!showGoals)
            }
          >
            🎯 Goals ▼
          </li>

          {showGoals && (
            <ul className="submenu">
              <li>
                <Link to="/goals/saving">
                  Saving Goals
                </Link>
              </li>

              <li>
                <Link to="/goals/spending-limit">
                  Spending Limit
                </Link>
              </li>
            </ul>
          )}

          {/* Reports */}
          <li
            className="menu-title"
            onClick={() =>
              setShowReports(!showReports)
            }
          >
            📊 Reports ▼
          </li>

          {showReports && (
            <ul className="submenu">
              <li>
                <Link to="/reports/monthly">
                  Monthly Report
                </Link>
              </li>

              <li>
                <Link to="/reports/pdf">
                  Download PDF
                </Link>
              </li>
            </ul>
          )}

          <li>
            <Link to="/account">
              👤 Account
            </Link>
          </li>

        </ul>
      </nav>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;