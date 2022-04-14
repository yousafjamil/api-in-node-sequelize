const { DataTypes, Sequelize } = require('sequelize');
const  Order=require('./order');
const  db=require('./database')

const Product = db.define('product', {
    name: Sequelize.DataTypes.STRING,
    price: Sequelize.DataTypes.INTEGER
});



//ASSOCiation  product  with  order
Product.hasMany(Order);
Order.belongsTo(Product);


module.exports = Product;