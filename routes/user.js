const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middelwares/auth');
const multer=require('multer');

// file storage set up
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
      const date = Date.now()
      cb(null, file.originalname + '-' +date)
    }
  });
const upload = multer({ storage: storage })

//user signup end point
router.post('/signup', async (req, res) => {
    
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "please fill all required fields",
            success: false,
            request: {
                type: "POST",
                url: "http://localhost:3000/user/signup"
            }
        })
    }
    const user = await User.findOne({
        where: {
            email
        }
    });
    if (user) {
        return res.status(200).json({
            message: "user already exist with this email",
            email,
            request: {
                type: "POST",
                url: "http://localhost:3000/user/signup"
            }
        });
    } else {
        const hashpassword = await bcrypt.hash(req.body.password, 10);
        const newUser = User.build({
            name,
            email,
            password: hashpassword

        });
        const user = await newUser.save();
        return res.status(200).json({
            message: "user successfully created",
            success: true,
            user,
            request: {
                type: "POST",
                url: "http://localhost:3000/user/signup"
            }
        });
    };
});

//user login end point
router.post('/login', async (req, res) => {

    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
        return res.status(404).json({
            message: "user does not exist",
            email: req.body.email,
            request: {
                type: "POST",
                url: "http://localhost:3000/user/signup"
            }
        });
    } else {
        const comparepassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparepassword) {
            return res.status(200).json({
                message: "Invalid password",
                success: false,
                password: req.body.password,
                request: {
                    type: "POST",
                    url: "http://localhost:3000/user/signup"
                }
            });
        } else {
            const token = jwt.sign({ id: user.id }, 'some secret key');
            return res.status(200).json({
                message: "user successfully Login",
                success: true,
                user,
                token,
                request: {
                    type: "POST",
                    url: "http://localhost:3000/user/signup"
                }
            });
        }
    }
});


//deshboard end point
router.get('/dashboard', auth, async (req, res) => {
    const users = await User.findAll();
    const userId = req.userId
    res.status(200).json({
        message: 'all users', users, request: {
            type: "GET",
            url: "http://localhost:3000/user/dashboard"
        }
    })
})


module.exports = router;