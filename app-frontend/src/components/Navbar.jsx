// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {

//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleLogout = () => {

//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     navigate("/");
//   };

//   return (
//     <div className="side-nav">

//       {/* Profile Section */}
//       <div className="profile-nav">

//         <img
//           src={
//             user?.profileImage
//               ? `http://localhost:6060/${user.profileImage}`
//               : "https://via.placeholder.com/80"
//           }
//           alt="Profile"
//           className="nav-profile-img"
//         />



//       </div>

//       <h1>Wallet-Notes</h1>

//       <nav>
//         <ul>

//           {/* Dashboard */}
//           <li>
//             <Link to="/dashboard">Dashboard</Link>
//           </li>

//           {/* Expenses */}
//           <li>
//             Expenses
//             <ul>
//               <li>
//                 <Link to="/expenses/all">All Expenses</Link>
//               </li>
//               <li>
//                 <Link to="/expenses/add">Add Expenses</Link>
//               </li>
//             </ul>
//           </li>

//           {/* Notes */}
//           <li>
//             Notes
//             <ul>
//               <li>
//                 <Link to="/notes/all">All Notes</Link>
//               </li>
//               <li>
//                 <Link to="/notes/add">Add Notes</Link>
//               </li>
//             </ul>
//           </li>

//           {/* Goals */}
//           <li>
//             Goals
//             <ul>
//               <li>
//                 <Link to="/goals/saving">Saving Goals</Link>
//               </li>
//               <li>
//                 <Link to="/goals/spending-limit">Spending Limit</Link>
//               </li>
//             </ul>
//           </li>

//           {/* Reports */}
//           <li>
//             Reports
//             <ul>
//               <li>
//                 <Link to="/reports/monthly">Monthly Report</Link>
//               </li>
//               <li>
//                 <Link to="/reports/pdf">Download PDF</Link>
//               </li>
//             </ul>
//           </li>

//           {/* Account */}
//           <li>
//             <Link to="/account">Account</Link>
//           </li>

//         </ul>
//       </nav>

//       <button
//         className="logout-btn"
//         onClick={handleLogout}
//       >
//         Logout
//       </button>

//     </div>
//   );
// }

// export default Navbar;

































import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser));
    }

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");

      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="side-nav">

      {/* Profile Section */}
      <div className="profile-nav">

        <img
          src={
            user?.profileImage
              ? `http://localhost:6060${user.profileImage}`
              : "https://via.placeholder.com/80"
          }
          alt="Profile"
          className="nav-profile-img"
        />



      </div>

      <h1>Wallet-Notes</h1>

      <nav>
        <ul>

          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li>
            Expenses
            <ul>
              <li>
                <Link to="/expenses/all">All Expenses</Link>
              </li>
              <li>
                <Link to="/expenses/add">Add Expenses</Link>
              </li>
            </ul>
          </li>

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

          <li>
            Goals
            <ul>
              <li>
                <Link to="/goals/saving">Saving Goals</Link>
              </li>
              <li>
                <Link to="/goals/spending-limit">
                  Spending Limit
                </Link>
              </li>
            </ul>
          </li>

          <li>
            Reports
            <ul>
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
          </li>

          <li>
            <Link to="/account">Account</Link>
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