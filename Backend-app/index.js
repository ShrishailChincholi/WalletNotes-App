require("dotenv").config();

const express = require('express');
const app = express();
const ConnenctDB = require('./config/dbconnect');
const Db = require('./modules/ExpensesModule');
const cors = require("cors");
const routernotes = require('./Router/Addnotes');
const ExpenseRouter = require('./Router/Expenses');
const goalsrouter = require('./Router/Savingoals');
const SavingGoalsModules = require('./modules/SavingGolas');
const SpendBugetRoute = require('./Router/spendBuget');
const BuddgetModule = require('./modules/BuddgetModule');
const AuthorizationRouter = require('./Router/Auth');

// ADD THIS LINE
const authMiddleware = require('./middleware/auth');


/* ================= DATABASE ================= */
ConnenctDB();


/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/* ================= ROUTERS ================= */
app.use('/expenses/add', ExpenseRouter);
app.use('/notes/add', routernotes);
app.use('/goals/saving', goalsrouter);
app.use('/goals/spending-limit', SpendBugetRoute);
app.use('/api/auth', AuthorizationRouter);


/* ================= EXPENSES ROUTE ================= */
app.get('/expenses/all', authMiddleware, async (req, res) => {
  try {

    // Get only logged-in user data
    const data = await Db.find({ userId: req.userId });

    res.json({
      success: true,
      data: data,
      count: data.length
    });

  } catch (err) {
    console.error("Error fetching data:", err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});


/* ================= GOALS ROUTE ================= */
app.get("/goals/saving", authMiddleware, async (req, res) => {

  try {

    const goals = await SavingGoalsModules.find({
      userId: req.userId
    });

    res.json({
      success: true,
      data: goals,
    });

  } catch (error) {

    console.log("Error fetching goals:", error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});


/* ================= SPENDING LIMIT ROUTE ================= */
app.get("/goals/spending-limit", authMiddleware, async (req, res) => {

  try {

    const budgetData = await BuddgetModule.findOne({
      userId: req.userId
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      budget: budgetData ? budgetData.amount : 0,
    });

  } catch (error) {

    console.log(`Error in fetching total budget: ${error}`);

    res.status(500).json({
      success: false,
      message: "Failed to fetch total budget",
    });
  }
});

/* ================= TEST ROUTE ================= */
app.get('/', (req, res) => {
  res.send("Hello Iam BackEnd - App");
});


/* ================= SERVER ================= */
const PORT = 6060 || 4000;


/* ================= SERVER LISTEN ================= */
app.listen(PORT, () => {

  console.log(`Server Is Running in http://localhost:${PORT}`);

  console.log(
    "JWT_SECRET:",
    process.env.JWT_SECRET ? "LOADED ✅" : "NOT LOADED ❌"
  );

});