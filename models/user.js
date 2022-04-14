const { DataTypes, Sequelize } = require('sequelize');
const  db=require('./database')

const User = db.define('user', {
    name: Sequelize.DataTypes.STRING,
    email: Sequelize.DataTypes.STRING,
    password: Sequelize.DataTypes.STRING, 
});


module.exports=User;