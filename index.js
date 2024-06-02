const express=require('express');
const {connectToMongoDB}=require('./connect');
const app= express();
const port =8001;
const urlRoute=require('./routes/url');

const URL =require('./models/url');

app.use(express.json());
connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log("mongodb conncted"));

app.use("/url",urlRoute);
app.get('/:shortId',async (req,res)=>{
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