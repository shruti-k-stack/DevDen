const express = require('express');
const { userAuth } = require('../middlewares/auth');

const requestRouter = express.Router();

requestRouter.post('/sendConnReq', userAuth, async (req, res) => {
    const user = req.user; // The user object is attached to the request by the auth middleware
    console.log("Sending a Connection Request");

    res.send(`${user.firstName} sent a connection request`);
})

module.exports = requestRouter;