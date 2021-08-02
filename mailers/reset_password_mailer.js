const nodemailer = require('../config/nodemailer');

exports.resetPassword = (token) => {
    let htmlString = nodemailer.renderTemplate({token: token}, '/password/reset_password.ejs');

    nodemailer.transporter.sendMail({
        from: 'codeial1930@gmail.com',
        to: token.user.email,
        subject: 'Password reset',
        html: htmlString
    }, (err, info) => {
        if(err) {
            console.log("Error in sending mail", err);
            return;
        }

        console.log('Message sent!', info);
        return;
    });
}