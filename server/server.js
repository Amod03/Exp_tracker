const express=require('express');
const app=express();
const cors=require('cors');

require('dotenv').config({path :'./config.env'})
const port=process.env.PORT||5000;

//use middleware
app.use(cors());
app.use(express.json());
//monogdb connection
const con=require('./db/connection.js');

//using routes
app.use(require('./routes/route'));

con.then(db=>{
    if(!db)return process.exit(1);

//listen to http server only when valid connection to mongodb cluster database
app.listen(port,()=>{
console.log(`server is running on port:${port} and http://localhost:${port}`)
})

app.on('error',err=>console.group(`Failes to connect with Http server:${err}`));
//error in mongodb connection
}).catch(error=>{
    console.log(`connection failes ${error}`)
})