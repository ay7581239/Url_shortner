const User=require('../models/user')

async function handlesignup(req,res){
    const {name,email,password}=req.body;
    if(!email) return res.status(400).json({error:'url is required'});
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");

}
async function handlelogin(req,res){
    const {email,password}=req.body;
    const user= await User.findOne({email,password});
    if(!user) return res.render("login",{error:"invalid Username or password",})
    return res.redirect("/");

}
module.exports={
    handlesignup,
    handlelogin,
}