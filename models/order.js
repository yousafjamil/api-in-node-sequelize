const { DataTypes } = require('sequelize');
const db = require('./database')

const Order = db.define('order', {
    
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
});



module.exports = Order;