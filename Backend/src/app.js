const express = require("express");

const app = express();

app.use("/", (req, res, next)=>{
    // res.send("this is a response 1");
    console.log("1");
    next();
})

app.get("/user", (req, res, next) => {
    console.log("2");
    next();
},
(req, res, next) => {
    console.log("3");
    next();
},
(req, res, next) => {
    res.send("this is a reponse 2");
})

app.listen(3000, ()=> {
    console.log("The server is running at port 3000 successfully")
});