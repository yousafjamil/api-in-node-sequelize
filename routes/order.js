const router = require('express').Router();
const Product = require('../../pro1/models/product');
const Order=require('../models/order');

//all orders end point
router.get('/',async (req, res) => {

    const  orders=await Order.findAll({include:{
        model:Product,
        attributes:['name','price','id']
    }});
        res.status(200).json({
            message: " all orders ",
            success:true,
            orders,
            request:{
                type:"GET",
                url:"http://localhost:3000/order"
            }
        });  
});

//create order end point
router.post('/', async(req, res) => {
    const  product=await Product.findByPk(req.body.productId)
    if(!product){
        res.status(404).json({
            message: "invalid product ID"
        });
    }
    const  order= await Order.create({
        quantity: req.body.quantity,
        productId: req.body.productId
    });
    res.status(200).json({
        message: "order succesfully created",
        success: true,
        order,
        request: {
            type: "POST",
            url: "http://localhost:3000/order"
        }
    });
});

//order update end point
router.put('/:orderId', async(req, res) => {
    const  order=await Order.findByPk(req.params.orderId)
    if(!order){
        res.status(400).json({
            message: "invalid order ID ",
            success: false,
            orderId: req.params.orderId,
            request: {
                type: "PUT",
                url: "http://localhost:3000/order/:orderId"
            }
        }); 
    }
    const  orderupdated=await Order.update(req.body,{
        where:{
            id:req.params.orderId
        }
    });
     res.status(200).json({
            message: "order successfully updated",
            success: true,
            orderId: req.params.orderId,
            orderupdated,
            request: {
                type: "PUT",
                url: "http://localhost:3000/order/:orderId"
            }
        });
      
});

//order delet end point
router.delete('/:orderId',async (req, res) => {
    const  order=await Order.findByPk(req.params.orderId);
    if(!order){
        res.status(200).json({
            message: " Error in order Deleting ",
            orderId:req.params.orderId,
            request:{
                type:"DELETE",
                url:"http://localhost:3000/order/:orderId"
            }
        }); 
    }
    const deletingOrder=  await Order.destroy({where:{
        id:req.params.orderId
    }})
    res.status(200).json({
        message: "order successfully Deleted ",
        orderId:req.params.orderId,
        deletingOrder,
        request:{
            type:"DELETE",
            url:"http://localhost:3000/order/:orderId"
        }
    });
});

module.exports = router;