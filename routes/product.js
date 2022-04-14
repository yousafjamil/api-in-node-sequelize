const router = require('express').Router();
const Product = require('../models/product');
const db = require('../models/database');
const Sequelize = require('sequelize');

router.get('/products', async (req, res) => {

    const product = await Product.findAll();
    res.status(200).json({
        success: true,
        message: "all products",
        product,
        request:{
            type:"GET",
            url:"http://localhost:3000/product/products"
        }
    });
});

router.get('/:productId', async (req, res) => {

    const product = await Product.findByPk(req.params.productId);
    if (!product) {
        res.status(404).json({
            success: false,
            message: "Product not found",
            id:req.params.productId,
            request:{
                type:"GET",
                url:"http://localhost:3000/product/:productId"
            }
        });
    } else {
        res.status(200).json({
            success: true,
            message: "you are searching product",
            product,
            request:{
                type:"GET",
                url:"http://localhost:3000/product/:productId"
            }
        });
    }
});

router.post('/', async (req, res) => {

    const { name, price } = req.body;
    if (!name || !price) {
        res.status(500).json({
            message: "please fill all required fields "
        });
    } else {
        const product = await Product.create({ name, price });
        res.status(200).json({
            message: "product successfully created ",
            product,
            createdProduct:{
                name:product.name,
                price:product.price
            },
            request:{
                type:"POST",
                url:"http://localhost:3000/product"
            }
        });
    }
});


router.put('/:productId', async (req, res) => {

    const product = await Product.findByPk(req.params.productId);
    if (!product) {
        res.status(404).json({ message: "updated product not found" })
    } else {
        const updatedproduct= await Product.update(req.body, {
            where: {
                id: req.params.productId
            }
        });
    };
   res.status(200).json({
        message: "product successfully updated ",
        product,
        request:{
            type:"PUT",
            url:"http://localhost:3000/product/:productId"
        }
    });
});

router.delete('/:productId',async (req, res) => {

    const  product=await Product.findByPk(req.params.productId);
   if(!product){
     res.status(404).json({
        success: false,
        message: "Deleting Product not found"
        });
     };
    const Deletedproduct=await  Product.destroy({where:{
      id:req.params.productId
    }});
    if(!Deletedproduct){
        res.status(400).json({
            message: "some error occured in product deleting ",
           id: req.params.productId,
        }); 
    }
    res.status(200).json({
        success:true,
        message: "product successfully deleted ",
        id: req.params.productId,
        request:{
            type:"DELETE",
            url:"http://localhost:3000/product/:productId"
        }
    });
});

module.exports = router;