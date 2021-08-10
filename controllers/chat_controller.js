const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.chatBox = async function(req, res) {

    let friends = [];

    let logedInUser = await User.findById(req.user._id).populate({
        path: 'friendships',
        populate: {
            path: 'from_user to_user'
        }
    }); 

    for(let i = 0; i < logedInUser.friendships.length; i++) {
        if(logedInUser.friendships[i].to_user.id != req.user.id) {
            friends[i] = logedInUser.friendships[i].to_user;
        } else {
            friends[i] = logedInUser.friendships[i].from_user;
        }
    }

    return res.render('chat_box', {
        title: 'Codeial | Chats',
        friend_list: friends
    });
} 