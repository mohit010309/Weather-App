const express=require('express');
const app=express();

app.get("/",function(req,res){
    console.log("welcome to root page");
    
    res.redirect("/about");
});
app.get("/about",function(req,res){
    res.send("This is about page");
});
app.listen(3000,function(){
    console.log("Server running on port 3000");
});