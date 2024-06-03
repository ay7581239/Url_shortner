const express=require('express');
const {connectToMongoDB}=require('./connect');
const app= express();
const port =8001;

const urlRoute=require('./routes/url');
const staticroute=require('./routes/staticroute');
const Userroute=require('./routes/user');

const path=require('path');
const URL =require('./models/url');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log("mongodb conncted"));
//ejs 
app.set("view engine",'ejs');
app.set("views",path.resolve("./views"));

app.use('/',staticroute);
app.use("/url",urlRoute);
app.use('/user',Userroute)
app.get('/api/:shortId',async (req,res)=>{
const shortId=req.params.shortId;
const entry=await URL.findOneAndUpdate({
    shortId
},
{ $push:{
    visitHistory:
    {
        timestamp:Date.now(),
},},
});
res.redirect(entry.redirectURL)
});
app.listen(port,()=>console.log(`Server started:${port}`));