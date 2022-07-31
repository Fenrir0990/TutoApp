const express = require("express");
const bodyParser = require ("body-parser");
require("./db") 

/* const routes = require('') */

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
/* app.use("/".routes) */

app.get("/1", (req,res)=>{
    res.send("hola mundo")
})

app.listen(3000,()=>{
    console.log("Online")
})