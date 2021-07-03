const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const { urlencoded } = require('express');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware( {
    src: './asserts/scss',
    dest: './asserts/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));

// Middleware to decrypt the form encripted data
app.use(express.urlencoded());
// Middleware to create and alter keys
app.use(cookieParser());

// using Static files.
app.use(express.static('./asserts'));

// Using layouts with partials
app.use(expressLayouts);

// Extract styles and scripts from the sub pages to the layout.
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// MongoStore is used to store session cookie in the db.
app.use(session({
    name : 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized : false,
    resave : false,
    cookie : {
        // in milliseconds
        maxAge : (1000 * 60 * 100)
    }, 
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_development',
            autoRemove: 'disabled'
        }, function(err) {
            console.log(err || 'connect-mongob setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router.
app.use('/', require('./routes'));

app.listen(port, function(err) {

    if(err) {
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is runnig on port no. : ${port}`);
});