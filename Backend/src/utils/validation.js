const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName) {
        throw new Error("firstName and lastName are required");
    } else if(!validator.isEmail(emailId)) {
        throw new Error("Enter a valid email address");
    } else if(!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }
}

const validateLoginData = (req) => {
    const {emailId, password} = req.body;
    if(!emailId || !password || !validator.isEmail(emailId)) {
        throw new Error("Invalid credintilas");
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skills"];
    const isEditAllowed = Object.keys(req.body).every((field) => {
        return allowedEditFields.includes(field);
    })
    return isEditAllowed;
}

const validateEditPasswordData = (req) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if(!oldPassword || !newPassword || !confirmPassword) {
        throw new Error("password incorrect");
    } else if(newPassword !== confirmPassword) {
        throw new Error("enter new password correctly!");
    } else if(!validator.isStrongPassword(newPassword)) {
        throw new Error("enter strong new password");
    }
}

module.exports = {
    validateSignUpData,
    validateLoginData,
    validateEditProfileData,
    validateEditPasswordData
}