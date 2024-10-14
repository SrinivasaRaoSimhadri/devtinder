const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const ALLOWED_STATUS = ["ignored", "intrested"];
        if(!ALLOWED_STATUS.includes(status)) {
            throw new Error("invalid status");
        }

        const toUser = await User.findById(toUserId);
        if(!toUser) {
            return res.status(404).send("user not found");
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId, toUserId}, 
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })

        if(existingConnectionRequest) {
            throw new Error("connection already exists");
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        await connectionRequest.save();

        return res.json({
            message: `${req.user.firstName} ${status} ${status === "intrested"?"in " + toUser.firstName:toUser.firstName}`,
            connectionRequest
        })
    } catch(error){
        return res.status(400).send("Error: "+error.message);
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res)=> {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;
        const ALLOWED_STATUS = ["accepted", "rejected"];
        if(!ALLOWED_STATUS.includes(status)) {
            throw new Error("invalid status");
        }

        const connectionRequest  = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "intrested"
        })

        if(!connectionRequest) {
            throw new Error("invalid request");
        }

        connectionRequest.status = status;

        const updatedConnectionRequest = await connectionRequest.save();
        return res.json({
            message: `${status} successfully`,
            connectionStatus: updatedConnectionRequest
        })
    } catch(error) {
        return res.status(400).send("Error: " +error.message);
    }
})

module.exports = requestRouter;

