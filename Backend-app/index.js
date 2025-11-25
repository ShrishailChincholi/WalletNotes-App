const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello Iam BackEnd - App");
});

const PORT = 6060 || 4000;
app.listen(PORT,()=>{
    console.log(`Server Is Running in http://localhost:${PORT} `)
});