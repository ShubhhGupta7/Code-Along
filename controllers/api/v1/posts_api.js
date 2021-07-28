const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res) {
    let posts = await Post.find({}).sort('-createdAt').populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return res.status(200).json({
        data: {
            posts: posts
        },
        message: 'Posts Lists'
    });
}


module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);

        // if(req.user.id == post.user) {
            post.remove();
    
            await Comment.deleteMany({post: req.params.id});

            // req.flash('success', 'Post deleted!');
            // return res.redirect('back');

            return res.json(200, {
                message: 'Post and comments associated deleted successfully!'
            });
        // } else {
        //     req.flash('error', 'Not authorized to delete the post!');
        //     return res.redirect('back');
        // }
    } catch(err) {
        return res.json(500, {
            message: 'Internal Server Error!!!'
        });
        // req.flash('error', err);
        // return res.redirect('back');
    }
}