
require('dotenv').config();
const {name,user,pass,port,host} = process.env;
const modelo = require("./tables/index.js"); 
const Sequelize = require("Sequelize");

let sequelize = new Sequelize(name,user,pass,{
    host:host,
    dialect:"mysql",
});
 
const table = modelo(sequelize,Sequelize);

sequelize.sync({force:true})
    .then(()=>{
        console,log("Tablas sincronizadas")
    });

module.exports = {
    table
}

