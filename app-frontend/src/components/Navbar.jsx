import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="side-nav">
      <h1>Wallet-Notes</h1>
      <img src="" alt="img" />

      <nav>
        <ul>

          {/* Dashboard */}
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          {/* Expenses */}
          <li>
            Eepenses
            <ul>
              <li>
                <Link to="/expenses/all">All Expenses</Link> 
              </li>
              <li>
                <Link to="/expenses/add">Add Expenses</Link>
              </li>
            </ul>
          </li>

          {/* Notes */}
          <li>
            Notes
            <ul>
              <li>
                <Link to="/notes/all">All Notes</Link>
              </li>
              <li>
                <Link to="/notes/add">Add Notes</Link>
              </li>
            </ul>
          </li>

          {/* Goals */}
          <li>
            Goals
            <ul>
              <li>
                <Link to="/goals/saving">Saving - Goals</Link>
              </li>
              <li>
                <Link to="/goals/spending-limit">Spending-limit</Link>
              </li>
            </ul>
          </li>

          {/* Reports */}
          <li>
            Report
            <ul>
              <li>
                <Link to="/reports/monthly">Monthly Report</Link>
              </li>
              <li>
                <Link to="/reports/pdf">Download PDF</Link>
              </li>
            </ul>
          </li>

          {/* Account */}
          <li>
            <Link to="/account">Account</Link>
          </li>

        </ul>
      </nav>

      <button>Logout</button>
    </div>
  );
}

export default Navbar;
