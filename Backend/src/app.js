const express = require("express");

const app = express();

app.get("/user", (req, res) => {
    res.send({name: "Srinu"});
})

app.post("/user", (req, res) => {
    res.send("user details saved successfully!");
})

app.delete("/user", (req, res)=>{
    res.send("user details deleted successfully!");
})

app.use("/test", (req, res) => {
    res.send("this is the hello from the /test!");
})

app.listen(3000, ()=> {
    console.log("The server is running at port 3000 successfully")
});