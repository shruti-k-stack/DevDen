const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;


app.post('/signup', async (req, res) => {
    const userObj = new User({
        firstName: 'Priya',
        lastName: 'DP',
        email: 'priya.k@example.com',
        password: 'priya@123',
        age: 20,
        gender: 'Female',
    });

    await userObj.save();
    res.send('User created successfully');

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

