const express = require('express');
const app = express();
const ExpenseRouter = require('./Router/Expenses');
const ConnenctDB = require('./config/dbconnect');

// DB Contection
ConnenctDB();

// Body Parser
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Routers
app.use('/exp',ExpenseRouter);

app.get('/',(req,res)=>{
    res.send("Hello Iam BackEnd - App");
});

const PORT = 6060 || 4000;
app.listen(PORT,()=>{
    console.log(`Server Is Running in http://localhost:${PORT} `)
});