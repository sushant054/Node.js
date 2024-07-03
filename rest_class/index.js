const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require("path");
const {v4:uuidv4}=require('uuid');
uuidv4(); //creates unique id's 
//(uuid)=>universally unique identifier

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id:uuidv4(),
        username: "sushant!",
        content: "i am in msc"
    },
    {
        id:uuidv4(),
        username: "Dr.Dhanraj!",
        content: "i am in msc(C.S)"
    },
];
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.get("/posts", (req, res) => {
    res.render("index.ejs",{posts});
    // res.send("server working well!");
});
//for updation
app.post("/posts", (req, res) => {
   let {username ,content}=req.body;
   let id=uuidv4();
   posts.push({id, username,content});
   //console.log(req.body); 
   //res.send("server working well!");
   res.redirect("/posts");//redirect to next page..
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("show.ejs",{post});
    //console.log(post);
    res.send("request working");
});
//patch is use to update post...
app.patch("/posts/:id",(req,res)=>{
    let{id}= req.params;
    let newContent =req.body.content;
    let post = posts.find((p)=>id === p.id);
    post.content=newContent;
    console.log(post);
    
    res.send("patch request working");
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
