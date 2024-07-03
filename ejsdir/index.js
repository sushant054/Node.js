const exp = require("constants");
const express = require("express");
const serveStatic = require('serve-static');
const path = require("path");
const app= express();
//console.log(app);
let port =3000;
//
//serving static files
//app.use(express.static(__dirname,"public"));
app.use(serveStatic(path.join(__dirname, 'public')));
app.listen(port,()=>{
    console.log(`app is listening on prot ${port}`);
});

app.set("view engine","ejs");
//if we want to start server from any prev. path we use app.set to find the view folder ####eg.nodemon nodejs/ejsdir/index.js
//this type of path
app.set("views",path.join(__dirname,"/views"));
app.get("/",(req,res)=>{
    //res.send("this is home");
    res.render("home");//we can also write .ejs infornt of home 
    //here we have created one folder views and inside that we created home.ejs file written in html..
});
app.get("/",(req,res)=>{
    let diceVal=Math.floor(Math.random()*6 + 1);
    res.render("rolldice.ejs",{diceVal});//{}<---this is object..
});
//Instagram ejs
// app.get("/ig/:username",(req,res)=>{
//     const followers =["om","sai","ram"];
//     let {username}=req.params;
//    // console.log(username);
//     res.render("instagram.ejs",{username, followers});
// });
app.get("/ig/:username",(req,res)=>{
        let {username}=req.params;
    const instaData = require("./data.json");
   // console.log(instaData);
    const data=instaData[username];
    if(data){
        res.render("instagram.ejs",{data});
    }else{
        res.render("error.ejs");
    } 
 });
