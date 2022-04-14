const {Sequelize}=require('sequelize');

const  db=new Sequelize("productStore","root","root",{
host:'localhost',
logging:false,
dialect:'mysql'
});

module.exports=db;