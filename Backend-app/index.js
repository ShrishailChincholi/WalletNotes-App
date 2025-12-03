const express = require('express');
const app = express();
const ConnenctDB = require('./config/dbconnect');
const Db  = require('./modules/ExpensesModule')
const cors = require("cors");
const routernotes = require('./Router/Addnotes');
const ExpenseRouter = require('./Router/Expenses');
const goalsrouter = require('./Router/Savingoals');
const SavingGoalsModules = require('./modules/SavingGolas');

// DB Contection
ConnenctDB();

// Body Parser
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Routers
app.use('/expenses/add',ExpenseRouter);
app.use('/notes/add',routernotes)
app.use('/goals/saving',goalsrouter)
app.get('/expenses', async (req, res) => {
  try {
    const data = await Db.find();
    res.json(data);  // send data to frontend
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/goals/saving',async (req, res) => {
  try {
    const goals = await SavingGoalsModules.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching goals", error: error.message });
  }
}
)

app.get('/',(req,res)=>{
    res.send("Hello Iam BackEnd - App");
});

const PORT = 6060 || 4000;
app.listen(PORT,()=>{
    console.log(`Server Is Running in http://localhost:${PORT} `)
});