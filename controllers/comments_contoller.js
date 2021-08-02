const Comment = require('../models/comment');
const Post = require('../models/post');

const commentsMailler = require('../mailers/comments_mailer');

const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comments_queue_worker.js');

// Async Syntax
module.exports.create = async function(req, res) {
    try {
        let post = await Post.findById(req.body.post);

        if(post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();

            // Simillar for comments to fetch the user's id!
            // comment = await comment.populate('user', 'name email').execPopulate();
            commnet = await comment.populate('user').populate({
                path: 'post',
                populate: {
                    path: 'user email'
                }
            }).execPopulate();

            // Sending mail to the person how have commented
            // commentsMailler.newComment(comment);

            // Sending mail using delayed jobs
            let job = queue.create('emails', comment).save(function(err) {
                if(err) {
                    console.log('Error in sending to the queue: ', err);   
                    return;
                }

                console.log('Jon enquened',job.id);
                return;
            });

            if(req.xhr) {
                res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: 'Comment Created!'
                });
            }

            req.flash('success', 'Comment posted!');
            return res.redirect('back');
        } else {
            req.flash('error', "Post does'nt exist!");
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', error);
        return;
    }
}

// Normal Syntax
// module.exports.create = function(req, res) {
    
//     Post.findById(req.body.post, function(err, post) {
//         if(err) {
//             console.log('Error in fetching the post for Comments.');
//             return;
//         }

//         if(post) {
//             Comment.create( 
//                 {
//                     content: req.body.content,
//                     user: req.user._id,
//                     post: req.body.post 
//                 }, function(err, comment) {
//                     if(err) {
//                         consolele.log('Error in creating Comment.');
//                         return;
//                     }

//                     post.comments.push(comment);
//                     post.save();

//                     return res.redirect('back');
//                 });
//         }
//     });
// }

// Async Await Syntax
module.exports.destroy = async function(req, res) {
    try {
        let comment = await Comment.findById(req.params.id);

        if(req.user.id == comment.user || req.user.id == post.user) {
            let postId = comment.post;
            comment.remove();

            let post = Post.findByIdAndUpdate(postId, {$pull : {comments: req.params.id}});

            // Send the comment id which was deleted back to the views
            if(req.xhr) {
                res.status(200).json({
                    data: {
                       comment_id: req.params.id
                    },
                    message: 'Comment deleted'
                });
            }

            req.flash('success', 'Comment deleted!');
            return res.redirect('back');z
        } else {
            req.flash('error', 'Not authorized to delete comment!');
            return res.redirect('back');
        }

    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

//  Normal Syntax
// module.exports.destroy = function(req, res) {
//     Comment.findById(req.params.id, function(err, comment) {
//         Post.findById(comment.post, function(err, post) {
//             if(comment.user == req.user.id || post.user == req.user.id) {
//                 let postId = comment.post;
//                 comment.remove();
    
//                 Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post) {
//                     return res.redirect('back');
//                 })
//             } else {
//                 return res.redirect('back');
//             }
//         });
//     });
// }
