const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/signup', async (req, res) => {
    const userObj = new User(req.body);

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

