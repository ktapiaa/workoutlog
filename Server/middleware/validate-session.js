const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
console.log('token -->', token);
    if (!token) {
        return res.status(403).send({auth: false, message: "No token provided"})
    } else { 
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            console.log('decodeToken -->', decodeToken);
            if (!err && decodeToken){
                User.findOne({ where:{ id: decodeToken.id}, raw:true })
                .then(user =>{
                    console.log('user-->', user)
                    if (!user) throw err;
                    // console.log('req-->', req);
                    req.user = user;
                    next();
                })
                .catch(err => console.log(err));
            } else {
                req.errors = err;
                return res.status(500).send('Not Authorized');
            }
        });
    }
};

module.exports = validateSession;