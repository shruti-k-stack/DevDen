const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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

    const { email, password } = req.body;

    const user = await User.findOne({email: email});
    
    if (!user) {
        throw new Error("Invalid email");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        res.send('Login successful');
    }
    else {
        throw new Error("Invalid password");
    }
})

app.get('/user',async (req, res) => {
    try{
        const userEmail = req.body.email;
        
        const user = await User.find({ email : userEmail });
        res.send(user);
    }
    catch (err) {
        res.status(400).send('Something went wrong');
    }
})

app.get("/feed", async (req, res) => {

    try {
        const users = await User.find();
        res.send(users);
    }
    catch (err) {
        res.status(400).send('Something went wrong');
    }
})

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;
    try {
            const allowedUpdates = [ 'firstName', 'lastName', 'password', 'age', 'gender' ];

            const isUpdateAllowed = Object.keys(data).every((k) => {
                allowedUpdates.includes(k);
            });

            if (!isUpdateAllowed) {
                throw new Error("Invalid update");
            }

        const user = await User.findByIdAndUpdate(userId, data, {
            returnDocument : "after",
            runValidators : true,
        });
        console.log(user);
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send('User update failed' + err.message);
    }
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

