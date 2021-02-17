const router = require('express').Router();
let Seller = require('../models/Seller.model');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const checkAuth = require('../auth/check-auth');

router.route('/register').post((req, res) => {

    const sellerID = req.body.sellerID;
    const sellerName = req.body.sellerName;
    const contactNumber = req.body.contactNumber;
    let email = req.body.email;
    const company = req.body.company;
    const country = req.body.country;
    const password = req.body.password;

    if (!sellerID){
        return res.send({
            success: false,
            message: 'Seller ID can not be blank.'
        });
    }
    if (!sellerName){
        return res.send({
            success: false,
            message: 'Seller Name can not be blank.'
        });
    }
    if (!email){
        return res.send({
            success: false,
            message: 'Email can not be blank.'
        });
    }
    if (!contactNumber){
        return res.send({
            success: false,
            message: 'Contact Number can not be blank.'
        });
    }
    if (!company){
        return res.send({
            success: false,
            message: 'Company can not be blank.'
        });
    }
    if (!country){
        return res.send({
            success: false,
            message: 'Country can not be blank.'
        });
    }
    if (!password){
        return res.send({
            success: false,
            message: 'Password can not be blank.'
        });
    }

    email = email.toLowerCase();

    Seller.find({
        email: email
    },(err, previousSellers) =>{
        if(err){
            return res.send({
                success: false,
                message: 'Error: Server error'
            });

        }
        else if(previousSellers.length > 0){

            console.log('account exist');
            return res.send({
                success: false,
                message: 'Account already exist.'
            });
        }
        else{
            const newSeller = new Seller({
                sellerID,
                sellerName,
                email,
                contactNumber,
                company,
                country,
                password
            });
            newSeller.save((err, user) => {
                if (err === null) {
                    return res.send({
                        success: true,
                        message: 'new seller added.'
                    });
                }
                else if (err.errors.email) {
                    return res.send({
                        success: false,
                        message: err.errors.email.message

                    });
                }
                else if (err.errors.contactNumber) {
                    return res.send({
                        success: false,
                        message: err.errors.contactNumber.message
                    });
                }
                else {
                    return res.send({
                        success: false,
                        message: err.errors.password.message
                    });
                }
            });    
        }
    });
});

router.route('/getId').get((req, res) => {

    const start = new Date();
    start.setMonth(0, 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setMonth(11, 31);
    end.setHours(23, 59, 59, 999);

    Seller.find({ createdAt: { $gt: start, $lt: end } }, "sellerID")
        .sort("-createdAt")
        .then((result) => {
            let nextNum =
                result.length === 0
                    ? 1
                    : parseInt(result.shift().sellerID.slice(-4)) + 1;

            const formattedCount = "000".concat(nextNum).slice(-4);
            return res.status(200).json({
                success: true,
                data: `SE${start.getFullYear().toString().slice(-2)}${formattedCount}`,
            });
        })
        .catch((err) =>
            res.status(500).json({
                success: false,
                message: err.message,
            })
        );

});

router.route('/sign').post((req, res, next) => {
    Seller.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        userId: user[0]._id
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
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                success: false,
                message: err.message,
            });
        });
});

router.get('/view', checkAuth ,(req, res) =>{
    Seller.find()
        .then(seller => res.json(seller))
        .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;