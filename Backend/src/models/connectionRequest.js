const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        reqiured: true,
        ref: "User"
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        reqiured: true,
        ref: "User"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "intrested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }
    }
},{
    timestamps: true
})

connectionRequestSchema.indexes({fromUserId: 1, toUserId:1});

connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("connot send connection request to yourself");
    }
    next();
})

module.exports = mongoose.models.ConnectionRequest || mongoose.model("ConnectionRequest", connectionRequestSchema);