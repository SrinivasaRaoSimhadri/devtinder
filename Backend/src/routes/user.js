const express = require("express");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

const SAFE_DATA  = ["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"];

userRouter.get("/user/requests/received",userAuth,  async (req, res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "intrested"
        }).populate("fromUserId", SAFE_DATA);
        return res.send(connectionRequests);
    }catch(error) {
        return res.status(400).send("Error: "+error.message);
    }
})

userRouter.get("/user/connections",userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            status: "accepted",
            $or : [
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        }).populate("toUserId", SAFE_DATA).populate("fromUserId", SAFE_DATA);
        const connections = connectionRequests.map((request) => {
            if(request.fromUserId._id.equals(loggedInUser._id)) {
                return request.toUserId;
            } else {
                return request.fromUserId;
            }
        })
        res.send(connections);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.skip) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1)*limit;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        }).select(["fromUserId", "toUserId"]);

        const hiddenUserFeed = new Set();
        connectionRequest.forEach((request) => {
            hiddenUserFeed.add(request.fromUserId.toString());
            hiddenUserFeed.add(request.toUserId.toString());
        })
        
        const feed = await User.find({
            _id: {$nin: Array.from(hiddenUserFeed)}
        }).select(SAFE_DATA).skip(skip).limit(limit);

        res.send(feed);
    } catch(error) {
        return res.status(400).send("Error: "+error.message);
    }
})
module.exports = userRouter;