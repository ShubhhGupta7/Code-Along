const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');

module.exports.toggleLike = async function(req, res) {
    try{
        // route -> toggle/?id=abcde&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post') {
            likeable = await Post.findById(req.query.id).populate('likes');
        } else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if the like already exists
        let exisitingLike = await Like.findOne({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.type
        });

        // if the like already exists delete it.
        if(exisitingLike) {
            likeable.likes.pull(exisitingLike._id);
            likeable.save();

            exisitingLike.remove();
            deleted = true;
        } 
        // else make the new one.
        else {
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.json(200, {
            message: 'Request Successful!',
            data: {
                deleted: deleted
            }
        })

    } catch(err) {
        console.log('Error in liking the likeable', err);
        
        return res.json('500', {
            message: 'Internal Server Error!'
        });
    }
}