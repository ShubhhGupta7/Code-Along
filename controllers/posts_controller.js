const Post = require('../models/post');
const Comment = require('../models/comment');


// Async Await Syntax
module.exports.create = async function(req, res) {
    try {
        Post.create({
            content: req.body.content, 
            user: req.user
        });
        
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

