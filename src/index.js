const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const process = require('process');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);





    
connectDB().then(() => {
    console.log('Connection to database established...');
    app.listen(port, () => {
    console.log(`Server is successfully running on port ${port}`);
});
})
.catch((err) => {
    console.error('Error connecting to database: ', err);
});

