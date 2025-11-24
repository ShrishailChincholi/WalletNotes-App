function Navbar() {
    return (
        <>
        <div className="side-nav">
            <h1>Wallet-Notes</h1>
            <img src="" alt="img" />
             <nav>
            <ul>
                <li>Dashboard</li>
                <li>Eepenses</li>
                <ul>
                    <li>All Expenses</li>
                    <li>Add Expenses</li>
                </ul>
                <li>Notes</li>
                <ul>
                    <li>All Notes</li>
                    <li>Add NOtes</li>
                </ul>
                <li>Goals</li>
                <ul>
                    <li>Saving - Goals</li>
                    <li>Spending-limit</li>
                </ul>
                <li>Report</li>
                <ul>
                    <li>Monthly report</li>
                    <li>Download Pdf</li>
                </ul>
                <li>Account</li>
            </ul>
        </nav>

        <button>Logout</button>
        </div>
        </>
    )
}

export default Navbar