const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value))  {
                throw new Error("Not a valid emailId");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password");
            }
        }
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid!");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://i.pinimg.com/564x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("Invalid photo URL");
            } 
        }
    },
    about: {
        type: String, 
    },
    skills: {
        type: [String]
    }
},{
    timestamps: true
})

userSchema.methods.getJWT = function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, "Co-Dev@123", {expiresIn: "1d"});
    return token;
}

userSchema.methods.isPasswordValid = async function(userInputPassword) {
    const user = this;
    return await bcrypt.compare(userInputPassword, user.password);
} 

module.exports = mongoose.models.User || mongoose.model("User", userSchema);