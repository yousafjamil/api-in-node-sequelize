const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    const token = req.header('token')
    if (!token) {
        res.status(404).json({ message: "Access Denied !" })
    }
    const verifyToken = jwt.verify(token, 'some secret key');
    if (!verifyToken) {
        res.status(500).json({ message: "Access Denied !" })
    } else {
        req.userId = verifyToken;
        next()
    }
};

module.exports = auth;