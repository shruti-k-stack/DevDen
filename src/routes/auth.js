const express = require('express');
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require('bcrypt');
const User = require('../models/user');

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {

    validateSignUpData(req);
    

    const { firstName, lastName, email, password, age, gender } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        firstName,
        lastName,
        email,
        password : hashedPassword,
        age,
        gender
    });
    await user.save();

    res.send('User created successfully');

})

authRouter.post ('/login', async(req, res) => {
    try {

    const { email, password } = req.body;

    const user = await User.findOne({email: email});
    
    if (!user) {
        throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {

        const token = await user.getJwt();
        console.log(token);

        res.cookie('token', token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), httpOnly: true });
        res.send('Login successful');
    }
    else {
        throw new Error("Invalid Credentials");
    }
        }catch (err) {
            res.status(400).send(err.message);
        }
})

module.exports = authRouter;