const { mongoose } = require('mongoose');
// eslint-disable-next-line no-unused-vars
const { dotenv } = require('dotenv').config();

const connectDB = async () => {
    // eslint-disable-next-line no-undef
    await mongoose.connect( process.env.MONGO_URI );
};

module.exports = connectDB;