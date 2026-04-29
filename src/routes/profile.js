const express = require('express');
const { userAuth } = require('../middlewares/auth');

const profileRouter = express.Router();

profileRouter.get('/profile', userAuth, async (req, res) => {
    try{
    const user = req.user; // The user object is attached to the request by the auth middleware
    res.send(user);
} catch (err) {
    res.status(400).send(`Something went wrong: ${err.message}`);
}
})

module.exports = profileRouter;