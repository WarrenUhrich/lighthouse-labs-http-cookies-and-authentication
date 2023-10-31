// npm init
// npm install express morgan cookie-parser ejs

/////////////////////////////////////////////////////////////////////////////
// Requires / Packages
/////////////////////////////////////////////////////////////////////////////

const express = require('express');
const morgan = require('morgan'); // Adds console logs to let us know about each request.
const cookieParser = require('cookie-parser');

/////////////////////////////////////////////////////////////////////////////
// Set-Up / Config
/////////////////////////////////////////////////////////////////////////////

const app = express();
const PORT = 8080;
app.set('view engine', 'ejs');

/////////////////////////////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////////////////////////////

app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cookieParser());

/////////////////////////////////////////////////////////////////////////////
// "Database"
/////////////////////////////////////////////////////////////////////////////

const users = {
    michael_myers: {
        username: 'michael_myers',
        password: '123'
    },
    freddy_kruger: {
        username: 'freddy_kruger',
        password: 'abc'
    },
};

/////////////////////////////////////////////////////////////////////////////
// Listener
/////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log('Express server is listening on port:', PORT);
});

/////////////////////////////////////////////////////////////////////////////
// Authentication Routes
/////////////////////////////////////////////////////////////////////////////

/**
 * Protected
 * 
 * (Web page should only show content if the user is signed in.)
 */
app.get('/protected', (req, res) => {
    const username = req.cookies.username;
    const user = users[username];
    if(user) {
        const templateVars = {
            user: user
        };
        res.status(200).render('protected', templateVars);
    } else {
        res.status(401).end('<h1>Forbidden! Please authenticate.</h1>');
    }
});

// GET  /sign-in  ---> Show the sign-in form.

/**
 * Sign In (Show Form)
 */
app.get('/sign-in', (req, res) => {
    res.status(200).render('sign-in');
});

// POST /sign-in  ---> Handle submission of sign-in form.

/**
 * Sign In (Handle Submission)
 */
app.post('/sign-in', (req, res) => {
    console.log('POST /sign-in; req.body:', req.body);
    const username = req.body.username;
    if(users[username]) { // Make sure user with this username exists
        const user = users[username]; // User in our database.
        const password = req.body.password;
        if(password === user.password) {
            // Happy path! Everything went well. Set a cookie and redirect!
            res.cookie('username', user.username);
            res.redirect('/protected');
        }
    }
    // They failed to sign in... show an error.
    res.status(400).end('<h1>Invalid credentials!</h1>');
});

// GET  /register ---> Show the register form.

/**
 * Register (Show Form)
 */
app.get('/register', (req, res) => {
    res.status(200).render('register');
});

// POST /register ---> Handle submission of register form.

/**
 * Register (Handle Submission)
 */
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(users[username]) { // Oh no... user is already in there!
        res.status(400).end('<h1>User already exists.</h1>');
    } else if(username && password) { // Both username and pass are here! Happy path!
        const newUser = {
            username: username,
            password: password
        };
        
        // Save user to database:
        users[username] = newUser;

        console.log('users:', users); // Check if new user is in here!?

        res.cookie('username', username);
        res.redirect('/protected');
    } else { // Looks like username or password are missing.
        res.status(400).end('<h1>Both username and password are required.</h1>');
    }
});

/**
 * Sign Out
 */
app.post('/sign-out', (req, res) => {
    res.clearCookie('username');
    res.redirect('/sign-in');
});

/////////////////////////////////////////////////////////////////////////////
// Cookie Routes
/////////////////////////////////////////////////////////////////////////////

/**
 * Set Cookie
 */
app.get('/set-example-cookie', (req, res) => {
    res.cookie('myFirstCookie', 'Woo! This is a cookie!'); // SET A COOKIE BY KEY / VALUE
    res.status(200).end('<p>Cookie is set!</p>');
});

/**
 * Read Cookie (as the Server)
 */
app.get('/read-example-cookie', (req, res) => {
    console.log('Cookies:', req.cookies); // REQ.COOKIES HAS ALL OF OUR COOKIE KEY/VALUE PAIRS FROM BROWSER

    const cookieValue = req.cookies.myFirstCookie;

    res.status(200).end(`<p>Cookie sent to server was, myFirstCookie: ${cookieValue}</p>`);
});

/**
 * Delete Cookie
 */
app.get('/delete-example-cookie', (req, res) => {
    // for(const cookieKey in req.cookies) {
    //     res.clearCookie(cookieKey);
    // }
    res.clearCookie('myFirstCookie'); // DELETE A COOKIE BY KEY
    res.status(200).end('<p>Cookie is deleted!</p>');
});
