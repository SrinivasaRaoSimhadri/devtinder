const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const { token }  = req.cookies;
        if(!token) {
            throw new Error("unoruthorized");
        }
        const decoded = jwt.verify(token, "Co-Dev@123");
        const { _id } = decoded;
        const user = await User.findById(_id);
        if(!user) {
            throw new Error("user not found");
        }
        req.user = user;
        next();
    } catch(error) {
        return res.status(400).send("Error: " + error.message);
    }
}

module.exports ={
    userAuth
};