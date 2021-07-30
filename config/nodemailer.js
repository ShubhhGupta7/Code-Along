const nodemailer = require('nodemailer');

const ejs = require('ejs');
const path = require('path');


// This is the part which defines how the mail are going to send, creating an connection between from and to(user)
let transporter = nodemailer.createTransport({
    // we can use different mailing service such as gmail, yahoo, etc. 
    service: 'gmail',
    host: 'smtp.gmail.com',

    // port can be used 465:SSL or 587:TLS TLS is more secured
    port: 587,

    // secure is false we can also use two factor auth
    secure: false,

    // Normal limit is 500 mails per day, if more it will be send next day, or you should be paying google then
    auth: {
        user: 'codeial1930@gmail.com',
        pass: 'Shukra@1930'
    }
});

// Render tamplate defines from the templates will be rendered for the mail from views->mailler
let renderTemplate = (data, relativePath) => {
    let mailHTML;

    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data, 
        function(err, template) {
            if(err) {
                console.log('Error in rendering the template: ', err);
                return;
            }

            mailHTML = template;
        }
    );

    return mailHTML;
};

// These two properties will be used, whenever we are sending mail so we are exporting it.
module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}