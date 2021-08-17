const nodemailer = require('nodemailer');
const env = require('../config/enviroment');
const ejs = require('ejs');
const path = require('path');


// This is the part which defines how the mail are going to send, creating an connection between from and to(user)
let transporter = nodemailer.createTransport(env.smtp);

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