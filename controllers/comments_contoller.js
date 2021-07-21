const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res) {
    
    Post.findById(req.body.post, function(err, post) {
        if(err) {
            console.log('Error in fetching the post for Comments.');
            return;
        }

        if(post) {
            Comment.create( 
                {
                    content: req.body.content,
                    user: req.user._id,
                    post: req.body.post 
                }, function(err, comment) {
                    if(err) {
                        consolele.log('Error in creating Comment.');
                        return;
                    }

                    post.comments.push(comment);
                    post.save();

                    return res.redirect('back');
                });
        }
    });
}

module.exports.destroy = function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        Post.findById(comment.post, function(err, post) {
            if(comment.user == req.user.id || post.user == req.user.id) {
                let postId = comment.post;
                comment.remove();
    
                Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post) {
                    return res.redirect('back');
                })
            } else {
                return res.redirect('back');
            }
        });
    });
}
