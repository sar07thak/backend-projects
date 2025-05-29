const { Router } = require("express");
const router = Router();
const ownerModel = require("../models/owner-model");
const bcrypt = require("bcrypt");

router.get("/" , (req , res ) => {
    res.send("hi");
})


router.post("/create" , async ( req , res ) => {
    try{
        const owner = await ownerModel.find();
        if( owner.length > 0 ) {
           return res.status(503).send("owner already exist , You can not create a owner !")
        }
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