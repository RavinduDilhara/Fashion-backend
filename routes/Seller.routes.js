const router = require('express').Router();
let Seller = require('../models/Seller.model');

router.route('/register').post((req, res) => {

    const sellerName = req.body.sellerName;
    const contactNumber = Number(req.body.contactNumber);
    let email = req.body.email;
    const company = req.body.company;
    const country = req.body.country;
    const password = req.body.password;
    const cnfPassword = req.body.cnfPassword;

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
    if (!cnfPassword){
        return res.send({
            success: false,
            message: 'Confirm Password can not be blank.'
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
            if(password === cnfPassword){
                const newSeller = new Seller({
                    sellerName,
                    email,
                    contactNumber,
                    company,
                    country,
                    password,
                    cnfPassword
                });
                newSeller.save((err, user) => {
                    if(err){
                        return res.send({
                            success: false,
                            message: 'Error: Server error'
                        });
                    }
                    return res.send({
                        success: true,
                        message: 'new seller added.'
                    });
                });
            }
            else{
                return res.send({
                    success: false,
                    message: 'password and confirm password are unmatching'
                });
            }    
        }
    });
});

module.exports = router;