const { Router } = require("express");
const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");
const bcrypt = require("bcrypt");
const validateAdmin = require("../Utils/validate");


// router.get("/" , (req , res ) => {
//     res.send("hi");
// })


router.post("/create" , async ( req , res ) => {
    try{
        const owner = await ownerModel.find();
        //* check if any admin present or not
        if( owner.length > 0 ) {
           return res.status(503).send("owner already exist , You can not create a owner !")
        }
        //* validate admin using validator library
        validateAdmin(req.body);

        const { fullName , email } = req.body ;
        req.body.password = await bcrypt.hash(req.body.password,10);
        console.log(req.body);
        
        const ownerCreate = await ownerModel.create({
            fullName : fullName  ,
            email : email ,
            password : req.body.password  ,
        });
        res.status(201).send(ownerCreate);
    }catch(err){
        res.status(404).send("Error : " + err.message );
    }
} )

module.exports = router ;