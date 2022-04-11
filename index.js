const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'callmeRe@1B',
    database:'employee_system'
})

app.post('/create',(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    const query = 'INSERT INTO employees (name,age,country,position,wage) VALUES(?,?,?,?,?)';
    db.query(query,[name,age,country,position,wage],(err,result)=>{
        if(err)console.log(err)
        else console.log(result);
    })


})

app.get('/employees',(req,res)=>{
    const query = "SELECT * FROM employees";
    db.query(query,(err,result)=>{
        if(err)throw err;
        else
        {
            console.log(result);
            res.send(result);
        }
    })
})
app.delete('/delete/:name',(req,res)=>{
     const name = req.params.name;
     const query = 'DELETE FROM employees where name = ?';
     db.query(query,name,(err,result)=>{
         if(err)console.log(err);
         else
         {
             console.log(result);
         }
     })
})
app.listen(3001,()=>{
    console.log(`listening to the port at 3001`);
})