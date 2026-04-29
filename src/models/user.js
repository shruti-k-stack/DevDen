const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const validator = require('validator');
const bcrypt = require('bcrypt');
const { jwt } = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    gender: {
        type: String,
        required: true,
        validate(value) {
            if (![ 'male', 'female', 'other' ].includes(value)) {
                throw new Error("Gender must be either male, female, or other");
            }
        }
    },
},
{    timestamps: true
});

userSchema.methods.getJwt = async function() {
    const user = this;

    const token = await jwt.sign({ _id: user._id}, "DevDen@$#456", { expiresIn: '7d' });
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;

    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

const User = mongoose.model('User', userSchema);

module.exports = User;