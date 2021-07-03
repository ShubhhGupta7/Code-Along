const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        // Comment belongs to a user
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }, 
        // Comment belongs to a post
        post : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    },
    
    {
        timestamps: true
    });

    const Comment = mongoose.model('Comment', commentSchema);

    module.exports = Comment;