const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData, validateLoginData }  = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);
        const {firstName, lastName, emailId, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = User({
            firstName,
            lastName,
            emailId, 
            password: hashedPassword
        });
        await user.save();
        return res.send("User created successfully!"); 
    } catch (error) {
        return res.status(400).send("Error: " + error.message);
    }

})

authRouter.post("/login", async (req, res) => {
    try {
        validateLoginData(req);
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId});
        if(!user) {
            throw new Error("invalid credintials");
        }
        const isPasswordValid = await user.isPasswordValid(password);
        if(!isPasswordValid) {
            throw new Error("invalid credintials");
        }
        const token = user.getJWT();
        res.cookie("token", token);
        return res.send(user);
    }catch (error) {
        return res.status(400).send("Error: " + error.message);
    }
})

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    res.send("use logged out successfully");
})

module.exports = authRouter;