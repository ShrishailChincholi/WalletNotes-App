const express = require('express');
const app = express();
const ConnenctDB = require('./config/dbconnect');
const Db  = require('./modules/ExpensesModule')
const cors = require("cors");
const routernotes = require('./Router/Addnotes');
const ExpenseRouter = require('./Router/Expenses');

// DB Contection
ConnenctDB();

// Body Parser
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Routers
app.use('/expenses/add',ExpenseRouter);
app.use('/notes/add',routernotes)
app.get('/expenses', async (req, res) => {
  try {
    const data = await Db.find();
    res.json(data);  // send data to frontend
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Server error" });
  }
});


app.get('/',(req,res)=>{
    res.send("Hello Iam BackEnd - App");
});

const PORT = 6060 || 4000;
app.listen(PORT,()=>{
    console.log(`Server Is Running in http://localhost:${PORT} `)
});