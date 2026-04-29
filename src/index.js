const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const process = require('process');
const { userAuth } = require('./middlewares/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.post('/signup', async (req, res) => {

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

app.post ('/login', async(req, res) => {
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


app.get('/profile', userAuth, async (req, res) => {
    try{
    const user = req.user; // The user object is attached to the request by the auth middleware
    res.send(user);
} catch (err) {
    res.status(400).send(`Something went wrong: ${err.message}`);
}
})

app.post('/sendConnReq', userAuth, async (req, res) => {
    const user = req.user; // The user object is attached to the request by the auth middleware
    console.log("Sending a Connection Request");

    res.send(`${user.firstName} sent a connection request`);
})
    
connectDB().then(() => {
    console.log('Connection to database established...');
    app.listen(port, () => {
    console.log(`Server is successfully running on port ${port}`);
});
})
.catch((err) => {
    console.error('Error connecting to database: ', err);
});

