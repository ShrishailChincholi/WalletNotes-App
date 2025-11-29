const express = require('express');
const app = express();
const ExpenseRouter = require('./Router/Expenses');
const ConnenctDB = require('./config/dbconnect');
const Db  = require('./modules/ExpensesModule')
const cors = require("cors");
const routernotes = require('./Router/Addnotes');

// DB Contection
ConnenctDB();

// Body Parser
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Routers
app.use('/expenses/add',ExpenseRouter);
app.use('/notes/add',routernotes)
// app.get('/expenses/add', async(req,res)=>{
//     const data = await Db.find()
  
// })

app.get('/',(req,res)=>{
    res.send("Hello Iam BackEnd - App");
});

const PORT = 6060 || 4000;
app.listen(PORT,()=>{
    console.log(`Server Is Running in http://localhost:${PORT} `)
});