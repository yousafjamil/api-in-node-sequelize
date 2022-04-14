const express = require('express');
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//db connection
const  db=require('./models/database');
db.authenticate().then( ()=>{
    console.log('data base connected')
}).catch((err)=>{
    console.log("error in DB connection",err)
});
db.sync({alter:true}).then(()=>{
    console.log('database sync')
}).catch((err)=>{
    console.log('error in sync',err)
});

//product routes
app.use('/product', require('./routes/product'));
//order routes
app.use('/order', require('./routes/order'));
//user routes
app.use('/user',require('./routes/user'));
//Error handling middlewares
app.use((req, res, next) => {
    const error = new Error('Page not found 404');
    error.status = 404;
    next(error)
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log('app  started..')
})