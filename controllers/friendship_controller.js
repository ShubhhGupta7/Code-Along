const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.toggleFriendship = async function(req, res) {
    try{
        let isFriendNow;

        let friend = await Friendship.findOne({
            $or: [{to_user: req.params.id}, {from_user: req.params.id}] 
        });

        let fromUser = await User.findById(req.user.id);
        let toUser = await User.findById(req.params.id);
       
        if(friend) {
            await User.findByIdAndUpdate(fromUser.id, {$pull: {friendships: friend._id}});
            await User.findByIdAndUpdate(toUser._id, {$pull: {friendships: friend._id}});
            friend.remove();
            isFriendNow = false;
        } else {
            friend = await Friendship.create({
                to_user: req.user.id,
                from_user: req.params.id
            });
        
            toUser.friendships.push(friend);
            fromUser.friendships.push(friend);
            
            toUser.save();
            fromUser.save();
            isFriendNow = true;
        }

        return res.json(200, {
            message: 'Successfully added user in friend list',
            data: {
                isFriendNow: isFriendNow 
            }
        })
    } catch(err) {
        console.log('Error in completing the friend request', err);
        return res.status(500).json( 
            {
                message: 'Internal Server Error!'
            }
        );
    }
}