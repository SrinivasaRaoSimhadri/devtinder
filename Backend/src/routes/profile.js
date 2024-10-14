const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const { validateEditProfileData, validateEditPasswordData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    }catch (error) {
        return res.status(400).send("An error occured in profile fetching!" + error.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if(!validateEditProfileData(req)) {
            throw new Error("you are not allowd to edit emailor password");
        }
        const { _id } = req.user;
        const dataToUpdate = req.body;
        const updatedUser = await User.findByIdAndUpdate(_id, dataToUpdate, {
            runValidators: true,
            returnDocument: "after"
        })
        return res.send(updatedUser);
    } catch(error) {
        return res.status(400).send("Error: " + error.message);
    }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        validateEditPasswordData(req);
        const { oldPassword, newPassword } = req.body;
        const user = req.user;
        const isCorrectPassword = await user.isPasswordValid(oldPassword);
        if(!isCorrectPassword) {
            throw new Error("invalid password");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await User.findByIdAndUpdate(user._id, {password: hashedPassword}, {
            returnDocument: "after"
        });
        return res.send("password edited successfully");
    } catch(error) {
        return res.status(400).send("Error: " + error.message);
    }
})


module.exports = profileRouter;