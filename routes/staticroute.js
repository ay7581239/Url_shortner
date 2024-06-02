const express=require("express"); 
const URL =require('../models/url');
const router=express.Router();
router.get('/',async(req,res)=>{
    const result=await URL.find({});
    res.render('home',{urls:result,});
})
module.exports=router;