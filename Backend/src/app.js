const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const ConnectDB  = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
    
    const user = User({
        firstName: "Srinu",
        lastName: "simhadri",
        emailId: "srinu@gmail.com",
        password: "srinu@123",
        age: 20,
        gender: "male",
    })

    try {
        await user.save();
        res.send("User created successfully!");
    } catch (error) {
        res.status(400).send("An error occured!" + error.message);
    }

})

const Start = async () => {
    try {
        await ConnectDB();
        app.listen(3000, ()=> {
            console.log("The server is running at port 3000 successfully!")
        });
    }catch(error) {
        console.log(error);
    }
} 
Start();
