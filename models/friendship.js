const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // the user who sent the request.
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // the user who accepts the request, the name is just to understand, the user won't see an difference
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;