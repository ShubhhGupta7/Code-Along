const Friendship = require('../models/friendship');
const Post = require('../models/post');
const User = require('../models/user');

// In method one
// module.exports.home  = function(req, res) {

// In async await
module.exports.home = async function(req, res) {  

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

    // We can write this code in there ways, 
    // First is the given below nested call backs
    // Second using promises, post.find().then(); 
    // And the last and we will be using async await.

    // At every place async await is not nessessary, it is useful when we are call backing in the nested manner to make out code more formated.

    // Populating user and comments with comments user for displaying a full post.

    // First syntax which we will be using when nested callbacks are not present is given below(Known as callback hell):
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'user'
    //     }
    // })
    
    
    // .exec(function(err, posts) {
    //     if(err) {
    //         console.log('Error in fetching data from the user.');
    //     }

    //     User.find({}, function(err, users) {
    //         return res.render('home', {
    //             'title' : 'Codeial | Home',
    //             'post_list' : posts,
    //             'all_users' : users
    //         }); 
    //     });       
    // })

    // This code will will be used when there is nested call back present in our code, By using asyn await.
    // To have a more formatted code.

    // Asyn await tells the browser that these are asynchronous statement so with every statement wait for the response then move to the next statememt.

    // Asunchronus statment means these statements are called and browser does't wait for there response and execute the next statement

    // Synchronous statement means that as the statement get executed browser will wait for its response.
    
    // Defaulty every statement is Async to make it sync pass third argu as true.

    try {
        let posts = await Post.find({}).sort('-createdAt')
        .populate('user').populate('likes').populate('comments')
        .populate({
            path: 'comments',
            populate: {
                path: 'likes'
            }, 
            populate : {
                path: 'user'
            } 
        });
        
        let users = await User.find({});
        let friends = [];
        
       if(req.user) {
            let logedInUser = await User.findById(req.user._id).populate({
                path: 'friendships',
                populate: {
                    path: 'from_user to_user'
                }
            }); 
            // This is the syntax to populate the fields on the same level by space seperating the keys in the path 

        
            for(let i = 0; i < logedInUser.friendships.length; i++) {
                if(logedInUser.friendships[i].to_user.id != req.user.id) {
                    friends[i] = logedInUser.friendships[i].to_user;
                } else {
                    friends[i] = logedInUser.friendships[i].from_user;
                }
            }
       }
    
        return res.render('home', {
            title : "Codeial | Home",
            post_list : posts,
            all_users: users,
            friend_list: friends
        });
    } catch(err) {
        console.log('Error', err);
    }
   

    // The syntax with promises
    // Here exec is working like then in promises

    // using them
    // Post.find({}).populate('comments).them(function());

    // let posts = Post.find({}).populate('comments').exec();
    // posts.then();

};



//  module.exports.action_name = function(req, res) 
