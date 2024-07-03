const express= require("express");
const app=express();
const mysql=require('mysql2');
const path =require("path");
const methodOverride=require("method-override");
const { v4: uuidv4 } = require('uuid');
const { extend } = require("joi");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'Database name',
    password:'psw'
}) ;

let q="INSERT INTO user (id,username,email,password) VALUES ?";
//manual insertion of data
//let users=["123","sushh","sushantnalage54@gmail.com","abc"];
                                               
//
app.get("/",(req,res)=>{
    let q =`SELECT count(*) FROM user`;
    try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let count=result[0]["count(*)"];
      res.render("home.ejs",{count});
    });
  }catch(err){
  console.log(err);
  res.send("some error in DB");
  }
});

//show route
app.get("/user",(req,res)=>{
  let q=`SELECT * FROM user`;
  try{
    connection.query(q,(err,users)=>{
      if(err) throw err;
      res.render("showusers.ejs",{users});
    });
  }catch(err) {
    console.log(err);
    res.send("some error in DB");
  }
});

 
// Edit route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  console.log("Received ID:", id);  // Log the received ID
  if (id.endsWith('id')) {
    id = id.slice(0, -2); // Remove the extra 'id' at the end if present
  }
  console.log("Cleaned ID:", id);  // Log the cleaned ID
  let q = `SELECT * FROM user WHERE id = ?`;
  try {
    connection.query(q, [id], (err, result) => {
      if (err) throw err;
      console.log("Query result:", result);  // Log the query result
      if (result.length === 0) {
        res.send("User not found");
      } else {
        res.render("edit.ejs", { user: result[0] });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

//Update (DB) route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;
  if (id.endsWith('id')) {
    id = id.slice(0, -2); // Remove the extra 'id' at the end if present
  }
  let q = `SELECT * FROM user WHERE id = ?`;
  try {
    connection.query(q, [id], (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("User not found");
      } else {
        let user = result[0];
        if (formPass != user.password) {
          res.send("Wrong password");
        } else {
          let q2 = `UPDATE user SET username = ? WHERE id = ?`;
          connection.query(q2, [newUsername, id], (err, result) => {
            if (err) throw err;
            res.redirect("/user");
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

//new users
app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});
 
app.post("/user/new", (req, res) => {
  let { username, email, password } = req.body;
  let id = uuidv4();
  //Query to Insert New User
  let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log("added new user");
      res.redirect("/user");
    });
  } catch (err) {
    res.send("some error occurred");
  }
});

//delete user
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    res.send("some error with DB");
  }
});

app.delete("/user/:id/", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (user.password != password) {
        res.send("WRONG Password entered!");
      } else {
        let q2 = `DELETE FROM user WHERE id='${id}'`; //Query to Delete
        connection.query(q2, (err, result) => {
          if (err) throw err;
          else {
            console.log(result);
            console.log("deleted!");
            res.redirect("/user");
          }
        });
      }
    });
  } catch (err) {
    res.send("some error with DB");
  }
});

app.listen("3000",()=>{
    console.log("server is listening to port 3000");
});