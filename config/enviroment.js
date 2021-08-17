// Moving to the production enviroment where we will kept all the variables and crentials to a file name as enviroment.js in config folder.

// here we will define two modes for developement and as well as production

// usually credentials in developement mode are static and are only used in development mode.

// In production mode we use enviroment variables instead of static one so that not everyone can access it, but the one we want to. And they are dynamic that means random string.

const fs = require('fs');
// const rfs = require('rotating-file-stream');
const path = require('path');

// const logDirectory = path.join(__dirname, '../production_logs');
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// const accessLogStream = rfs.createStream('access.log', {
//     interval: '1d',
//     path: logDirectory
// });



const development = {
    name: 'development',
    assert_path: './asserts',
    // ket 1
    session_cookie_key: 'blahsomething', 
    db: 'codeial_development',
    smtp: {
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
    },
    google_client_id: '754866611754-hergoq3humbnuu9avdoqf0icqqssn30k.apps.googleusercontent.com',
    google_client_secret: 'W3C5i2pmXqowPpg2JGwUvQ4P',
    google_call_back_url: 'http://localhost:8000/users/auth/google/callback',
    // key 2
    jwt_secret: 'codeial',
    // morgan: {
    //     mode: 'dev',
    //     options: {stream: accessLogStream}
    // }
}
// both keys which are listed above must be random in production enviroment so we will use a website randomkeygen for randomly generating the keys for our keys so that no one can decript them

// CodeIgniter Encryption Keys this can be used
// or we can use 128bit  wep keys


// Production enviroment will be setup same as dev env, but with use of enviroment variables.

// Windows we use to find all the variables in power shell
// COMMAND: Get-ChildItem Env:

// we can set the enviroment variable in windows using power shell  
// COMMAND: setx VARIABLE_NAME "VALUE"

// const production = {
//     name: 'production',
//     assert_path: process.env.CODEIAL_ASSERT_PATH,
//     session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY, 
//     db: process.env.CODEIAL_DB,
//     smtp: {
//         // we can use different mailing service such as gmail, yahoo, etc. 
//         service: 'gmail',
//         host: 'smtp.gmail.com',
    
//         // port can be used 465:SSL or 587:TLS TLS is more secured
//         port: 587,
    
//         // secure is false we can also use two factor auth
//         secure: false,
    
//         // Normal limit is 500 mails per day, if more it will be send next day, or you should be paying google then
//         auth: {
//             user: process.env.CODEIAL_SMTP_AUTH_USER,
//             pass: process.env.CODEIAL_SMTP_AUTH_PASS
//         }
//     },
//     google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
//     google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
//     google_call_back_url: process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
//     jwt_secret: process.env.CODEIAL_JWT_SECRET,
//     morgan: {
//         mode: 'combined',
//         options: {stream: accessLogStream}
//     }
// }


const production =  {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_SMTP_AUTH_USER,
            pass: process.env.CODEIAL_SMTP_AUTH_PASS
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    // morgan: {
    //     mode: 'combined',
    //     options: {stream: accessLogStream}
    // }
}



// module.exports = eval(process.env.CODEIAL_ENVIROMENT == undefined ? "development" : process.env.CODEIAL_ENVIROMENT);

module.exports = eval('development');

// Now after setting the enviromenr file we heve to tell the express server to run in the production mode so to do so we will add some script in the package.json file.

// In package.json fill add a key prod_start where it signifies to run the server in the production mode.

// In package.json we will set value of prod_start as:
// "NODE_ENV" is the env_variable used for node we have used above CODEIAL_ENVIROMENT in place of that we can use NODE_ENV

// In usual basis we see NODE_ENV in place of CODEIAL_ENVIROMENT

// for now we are using nodemon as we have but in production we use node 

// COMMAND TO RUN SERVER IN PRODUCTION MODE
// npm run pord_start
// start is a predefined script and to run scripts which are not pre-defined we use npm run instead of npm 

// NODE_ENV=production nodemon index.js (Coding Ninjas)
// SET NODE_ENV=production & nodemon index.js (Used)

// we will be using morgan and rotating fiie stream for saving the logs in the production enviroment on the remove machine, to a file and to (using morgan) and to delete logs after some time we use (using rotating-file-system)

// now we will optimize the accerts file: 
// First we will pre compile the scss file to css file so that we are not everytime compiling them while accessing them

// we will compress these files in one line with shorter variable names and no spaces to optimize our code.

// example are the min files of cdn which we are using in our project

// we will use gulp for compressing and attaching hash to file name