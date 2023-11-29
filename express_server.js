// npm install express morgan ejs cookie-parser nodemon

/////////////////////////////////////////////////////////////////////////////////
// Requires / Packages
////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

/////////////////////////////////////////////////////////////////////////////////
// Set-up / Config
////////////////////////////////////////////////////////////////////////////////

const app = express();
const PORT = 8080;
app.set('view engine', 'ejs');

/////////////////////////////////////////////////////////////////////////////////
// Middleware
////////////////////////////////////////////////////////////////////////////////

app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cookieParser());

/////////////////////////////////////////////////////////////////////////////////
// "Database"
////////////////////////////////////////////////////////////////////////////////

const users = {
    uniqueId1: {
        id: 'uniqueId1',
        username: 'quinn',
        password: 'pass123'
    },
    uniqueId2: {
        id: 'uniqueId2',
        username: 'sam',
        password: 'p455'
    }
};

/////////////////////////////////////////////////////////////////////////////////
// Listener
////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log(`Express Server running at: http://localhost:${PORT}`);
});

/////////////////////////////////////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////////////////////////////////////

/**
 * GET /hello       Shows a hello test output.
 */
app.get('/hello', (req, res) => {
    // res.send('test123');
    // res.send('test123');
    res.end('<h1>Hello, World!</h1>');
});

/**
 * GET /read-cookies      Outputs cookie data for our domain.
 */
app.get('/read-cookies', (req, res) => {
    const cookies = req.cookies; // req.cookies is an object we can READ cookie data from!

    // console.log('cookies:', cookies);

    const templateVars = {
        keyValuePairs: cookies,
        pageName: 'Read Cookies'
    };

    res.render('read-cookies', templateVars);
});

/**
 * GET /set-cookies      Sets cookie data for our domain.
 */
app.get('/set-cookies', (req, res) => {
    res.cookie('iSetThisCookie', '🍪🍪🍪!YUM!🍪🍪🍪'); // res.cookie() is a method we use to SET/ASSIGN cookies!
    res.cookie('movie', 'TRON (1982)');

    // GET /read-cookies
    res.redirect('/read-cookies');
});

/**
 * GET /delete-cookies   Deletes cookie data for our domain.
 */
app.get('/delete-cookies', (req, res) => {
    // res.clearCookie('iSetThisCookie');
    // res.clearCookie('movie');

    for(const key in req.cookies) {
        res.clearCookie(key); // res.clearCookie() is a method for DELETING/REMOVING a cookie (by key!)
    }

    res.redirect('/read-cookies');
});

/**
 * GET  /protected       Page we need to be signed-in to see.
 * GET  /sign-in         Page with a sign-in form.
 * POST /sign-in         Set a cookie to show who we are in subsequent requests.
 *                       Redirect us to the /protected page.
 */

/**
 * GET  /protected       Page we need to be signed-in to see.
 */

app.get('/protected', (req, res) => {
    const cookies = req.cookies;

    const userId = cookies.userId;

    // Does this user ACTUALLY exist in our DB?
    const user = users[userId];

    if(user) {
        const templateVars = {
            signedInUser: user
        };

        res.render('protected', templateVars);
    } else {
        res.status(401).end('<p>FORBIDDEN!</p>');
    }
});

/**
 * GET  /sign-in         Page with a sign-in form.
 */
app.get('/sign-in', (req, res) => {
    const cookies = req.cookies;
    const userId = cookies.userId;

    if(userId) { // If signed in already, they don't need to be here!
        res.redirect('/protected');
    }

    res.render('sign-in');
});

/**
 * POST /sign-in         Set a cookie to show who we are in subsequent requests.
 *                       Redirect us to the /protected page.
 */
app.post('/sign-in', (req, res) => {
    const body = req.body; // req.body is our form submission! Don't forget to add NAME to your <input> elements!

    const username = body.username;
    const password = body.password;

    // console.log(
    //     'username:', username,
    //     'password:', password
    // );

    let user = null; // Default! No sign-in...

    for(const id in users) {
        const dbUser = users[id];

        if(username === dbUser.username) {
            if(password === dbUser.password) {
                user = dbUser; // This user can sign in!!!
            }
        }
    }

    if(user) { // Sign'em in!
        res.cookie('userId', user.id);
        res.redirect('/protected');
    } else { // Keep'em out!
        res.status(401).end('<p>Incorrect credentials. Try again.</p>');
    }
});

/**
 * POST /sign-out     // Destroy userId cookie!
 */
app.post('/sign-out', (req, res) => {
    res.clearCookie('userId');
    res.redirect('/sign-in');
});

/**
 * GET  /register        Show the user the registration form.
 * POST /register        Handle submission of registration form.
 */

/**
 * GET  /register        Show the user the registration form.
 */
app.get('/register', (req, res) => {
    const cookies = req.cookies;
    const userId = cookies.userId;

    if(userId) { // If signed in already, they don't need to be here!
        res.redirect('/protected');
    }

    res.render('register');
});

/**
 * POST /register        Handle submission of registration form.
 */
app.post('/register', (req, res) => {
    const body = req.body; // req.body is our form submission! Don't forget to add NAME to your <input> elements!
    const username = body.username;
    const password = body.password;

    let userExists = false; // If user doesn't already exist, we can continue!

    for(const id in users) {
        const dbUser = users[id];
        if(username === dbUser.username) {
            userExists = true; // If user DOES already exist, we can't register...
        }
    }

    if(userExists) {
        res.status(400).end('<p>User already exists!</p>');
        return;
    }

    const uniqueId = `uniqueId${Object.keys(users).length + 1}`;
    
    // Build a new user object!
    const newUser = {
        id: uniqueId,
        username: username,
        password: password
    };

    // Add the new user to our user database.
    users[uniqueId] = newUser;

    // console.log('users:', users);

    // Two options in register success:
        // 1. Sign them in!
        // 2. Send them to sign in now that their user exists...

    res.redirect('/sign-in');
});