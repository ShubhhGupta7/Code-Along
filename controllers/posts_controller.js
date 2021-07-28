const Post = require('../models/post');
const Comment = require('../models/comment');


// Async Await Syntax
module.exports.create = async function(req, res) {
    try {
        let post = await Post.create({
            content: req.body.content, 
            user: req.user._id
        });


        if(req.xhr) {
            // If we want to populate just the name of the user (we'll not want to sent the password in the API), this is how we do it!
            post = await post.populate('user', 'name').execPopulate();
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post Created!'
            });
        }
        
        req.flash('success', 'Post got published');
        return res.redirect('back');
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

// Normal Syntax
// module.exports.create = function(req, res) {
//     Post.create({
//             content: req.body.content,
//             user: req.user._id
//         }, function(err, post) {
//             if(err) {
//                 console.log('Error in Creating a Post.');
//                 return;
//             } 
//             return res.redirect('back');
//         }
//     );
// }

// Async Await Syntax

module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);

        if(req.user.id == post.user) {
            post.remove();
    
            await Comment.deleteMany({post: req.params.id});

            if(req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    }, 
                    message: 'Post deleted'
                })    
            } 
            
            req.flash('success', 'Post deleted!');
            return res.redirect('back');
        } else {
            req.flash('error', 'Not authorized to delete the post!');
            return res.redirect('back');
        }
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

// Normal Syntax
// module.exports.destroy = function(req, res) {
//     Post.findById(req.params.id, function(err, post) {
//         // .id means converting the object id into string
//         if(post.user == req.user.id) {
//             post.remove();

//             Comment.deleteMany({post: req.params.id}, function(err) {
//                 return res.redirect('back');
//             });
//         } else {
//             return res.redirect('back');
//         }   
//     }); 

// }

