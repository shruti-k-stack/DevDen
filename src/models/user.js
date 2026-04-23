const e = require('express');
const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);

module.exports = User;