const {DataTypes} = require('sequelize')
//Modelo de tutorial
module.exports = (sequelize, type) => {
    return sequelize.define('tutorial',{
        id:{
            type: DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey: true,
        },
        title:{
            type:DataTypes.STRING,
            allowNull: false
        } ,
        description:{
            type: DataTypes.STRING,
            allowNull:false
        },
        url:{
            type:DataTypes.STRING,
            default:"No Agregado"
        } 
    })
}