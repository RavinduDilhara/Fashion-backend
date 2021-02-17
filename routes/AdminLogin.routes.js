const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.route('/login').post((req, res, next) => {

    const email = 'admin@gmail.com';
    const password = 'admin123';

    if(req.body.adminEmail === email && req.body.adminPassword === password){
        const token = jwt.sign({
            userId: 'Admin'
        }, process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
        );
        return res.status(200).json({
            message: 'Login successful',
            token: token
        });
    }
    else {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
});

module.exports = router;