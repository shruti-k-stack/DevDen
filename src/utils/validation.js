var validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("First name and last name are required");
    } else if (!validator.isEmail(email)) {
        throw new Error("Invalid email format");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol");
    }
};

const validateProfileUpdateData = (req) => {

    const allowedFields = ['firstName', 'lastName', 'age', 'gender'];
    const isEditAllowed = Object.keys(req.body).every((field) => allowedFields.includes(field));

    if (!isEditAllowed) {
        throw new Error("Invalid field(s) in the update request");
    }
    else return true;

};
module.exports = {
    validateSignUpData,
    validateProfileUpdateData
};