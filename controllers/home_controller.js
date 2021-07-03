const Post = require('../models/post');
const User = require('../models/user');

module.exports.home  = function(req, res) {
    // console.log(req.cookies);
    // res.cookie('username', 'Muskan Gupta')

    // Post.find({}, function(err, posts) {
    //     if(err) {
    //         console.log('Error in fetching the post data from db.');
    //         return;
    //     }

    //     return res.render('home', {
    //         'title' : 'Home',
    //         'post_list' : posts
    //     });
    // });

    // Populate the user of each post
//     Post.find({}).populate('user').exec(function(err, posts) {
//         if(err) {
//             console.log('Error in fetching data from the user.');
//         }

//         return res.render('home', {
//             'title' : 'Codeial | Home',
//             'post_list' : posts
//         });        
//     })
// };

    // Populating user and comments with comments user for displaying a full post.
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    
    
    .exec(function(err, posts) {
        if(err) {
            console.log('Error in fetching data from the user.');
        }


        return res.render('home', {
            'title' : 'Codeial | Home',
            'post_list' : posts
        });        
    })
};



//  module.exports.action_name = function(req, res) 
