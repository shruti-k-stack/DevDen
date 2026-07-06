const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    status: {
        type: String,
        enum: {
            values: ['ignored', 'pending', 'accepted', 'rejected'],
            message: `{VALUE} is not a valid status type`
        }
    }
},
{
    timestamps: true
});

const ConnectionRequests = new mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequests;