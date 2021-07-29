const User = require('../../../models/user');

const jwt = require('jsonwebtoken');
// jwt is used to create a encrypted jwt token by using it's sign function where as passport is capable to decrypt that encoded jwt token.

module.exports.createSession = async function(req, res) {
    try{
       let user = await User.findOne({email: req.body.email});

       if(!user || user.password != req.body.password) {
            console.log(user);
            return res.json(422, {
                message: 'Invalid username/password'
            });
       }

       return res.json(200, {
           message: 'Signin successful, Here is your token, Please keep it safe!',
           data: {
               Token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '1000000'})
           }
       })

    } catch(err) {
        console.log('Error: ', err);
        return res.json('500', {
            message: 'Internal server error!'
        });
    }
}