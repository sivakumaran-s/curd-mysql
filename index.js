const mysql=require('mysql');
const express=require('express');
const bodyparser=require('body-parser');
const multipart = require('formidable/src/plugins/multipart');

var app=express(); 

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
var mysqlConnection= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node_mysql",
    multipelStatements: true

});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('db connection succed');
    else
        console.log('Db connection fail \n Error:'+JSON.stringify(err,undifined,2));
});

app.listen(3000,()=>{
    console.log("Express server is running at port no:3000")
});



app.post('/student',(req,res)=>{
    mysqlConnection.query("insert into student (id,name,city) values(?,?,?)",[req.body.id,req.body.name,req.body.city],(err,response)=>{
        if(!err)
        {
            res.send("record has been inserted successfuly!");
        }
        else
        {
            throw err;
        }
    });
});


app.get('/student',(req,res)=>{
    
    mysqlConnection.query("select * from student",(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    });
});


app.get('/student/:id',(req,res)=>{
    
    mysqlConnection.query("select * from student where id=?",[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows)
        else
        console.log(err);   
    })
})
app.put('/student/:id',(req,res)=>{
    
    mysqlConnection.query("update  student set city=? where id= ?",[req.body.city,req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send('record has update successfully')
        else
        console.log(err);   
    })
})
app.delete('/student/:id',(req,res)=>{
    
    mysqlConnection.query("delete from  student  where id= ?",[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send('record has delete successfully')
        else
        console.log(err);   
    })
})
