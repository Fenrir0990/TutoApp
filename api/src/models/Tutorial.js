const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('tutorial', {
    id: {     
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {   
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {  
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    url:{
      type:DataTypes.STRING,
      allowNull:true
    },
    state:{
      type:DataTypes.BOOLEAN,
      default:false
    }
  },
  {
    timestamps:false
  })
  
}
