const mongoose = require("mongoose");

const ConnectDB = async () => {
    await mongoose.connect("mongodb://localhost:27017/DevTinder");
    console.log("conneted to database successfully!");
}

module.exports = ConnectDB;