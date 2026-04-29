const jwt = require('jsonwebtoken');
const process = require('process');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(401).send('Unauthorized');
            return;
        }
        const decodedMsg = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        const { _id } = decodedMsg;
        const user = await User.findById(_id);
        if (user) {
            req.user = user; // Attach the user object to the request for use in the next middleware or route handler
            next();
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error.message);
    }
};

module.exports = { userAuth };