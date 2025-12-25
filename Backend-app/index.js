require("dotenv").config();

const express = require('express');
const app = express();
const ConnenctDB = require('./config/dbconnect');
const Db = require('./modules/ExpensesModule')
const cors = require("cors");
const routernotes = require('./Router/Addnotes');
const ExpenseRouter = require('./Router/Expenses');
const goalsrouter = require('./Router/Savingoals');
const SavingGoalsModules = require('./modules/SavingGolas');
const SpendBugetRoute = require('./Router/spendBuget');
const BuddgetModule = require('./modules/BuddgetModule');
const AuthorizationRouter = require('./Router/Auth');


// DB Contection
ConnenctDB();

// Body Parser
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routers
// app.use('/expenses/add',ExpenseRouter);
app.use('/expenses/add', ExpenseRouter);
app.use('/notes/add', routernotes);
app.use('/goals/saving', goalsrouter);
app.use('/goals/spending-limit', SpendBugetRoute);
app.use('/api/auth', AuthorizationRouter);

// All expenses get all data , and send to frontend
app.get('/expenses/all', async (req, res) => {
  try {
    const data = await Db.find();
    res.json({
      success: true,
      data: data
    }); // send data to frontend
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//Goals get all data , and send to frontend
app.get("/goals/saving", async (req, res) => {
  try {
    const goals = await SavingGoalsModules.find();

    res.json({
      success: true,
      data: goals,
    });
  } catch (error) {
    console.log("Error fetching goals:", error);
    res.json({ success: false });
  }
});

//spedinglimit Get the all data , and send to frontend
app.get("/goals/spending-limit", async (req, res) => {
  try {
    // Fetch the latest saved budget
    const budgetData = await BuddgetModule.findOne().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      budget: budgetData ? budgetData.budget : 0, // Return 0 if no budget is set
    });
  } catch (error) {
    console.log(`Error in fetching total budget: ${error}`, error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch total budget",
    });
  }
})


app.get('/', (req, res) => {
  res.send("Hello Iam BackEnd - App");
});

const PORT = 6060 || 4000;

// Sever Listen
app.listen(PORT, () => {
  console.log(`Server Is Running in http://localhost:${PORT} `);
  console.log("JWT_SECRET:", process.env.JWT_SECRET ? "LOADED ✅" : "NOT LOADED ❌");
});