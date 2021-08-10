//  Nodejs runs on a single main thread on the system and runs multiples processes parallely.

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
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMWare = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is listening on port 5000');

// It establish cross connection between socket.io server and client.....
// in previous version it was in bulid 
// but for now we have to install this and use like i mention below
cors = require("cors");
app.use(cors());

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

// make the uploads path avaliable to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

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

app.use(flash());
app.use(customMWare.setFlash);

// use express router.
app.use('/', require('./routes'));

app.listen(port, function(err) {

    if(err) {
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is runnig on port no. : ${port}`);
});