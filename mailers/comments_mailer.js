const nodemailer = require('../config/nodemailer');

//this is the another way of exporting a method
// here is a use case of arrow functions so we are using arrow function over here.
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: 'codeial1930@gmail.com',
        to: comment.user.email,
        subject: 'Your first Comment!',
        html: htmlString
    }, (err, info) => {
        if(err) {
            console.log('Error in sending mail: ', err);
            return;
        }

        console.log('Message Sent!', info);
        return;
    });
}

// Normail way
// let newComment = function(...) {};
// module.exports = newComment;