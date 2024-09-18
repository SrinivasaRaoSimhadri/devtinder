const express = require("express");

const app = express();

// app.use("/route", rh1, [rh2], [rh3, rh4], rh5, [rh6]);

app.use("/user", (req, res, next)=>{
    console.log("controller 1");
    next();
    // res.send("route handler 1"); 
},
(req, res, next) =>{
    console.log("controller 2");
    // res.send("route habdler 2");
    next();
},
(req, res, next)=>{
    console.log("controller 3");
    // res.send("route handler 3");
    next();
},
(req, res, next)=> {
    console.log("controller 4");
    res.send("route handler 4");
}
)

app.listen(3000, ()=> {
    console.log("The server is running at port 3000 successfully")
});