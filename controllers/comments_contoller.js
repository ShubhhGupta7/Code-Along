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

