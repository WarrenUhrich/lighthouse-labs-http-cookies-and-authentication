/////////////////////////////////////////////////////////////////////
// Requires
/////////////////////////////////////////////////////////////////////

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

/////////////////////////////////////////////////////////////////////
// Initialization
/////////////////////////////////////////////////////////////////////

const app = express();
const PORT = 8080;

/////////////////////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////////////////////

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(express.static('public'));

/////////////////////////////////////////////////////////////////////
// Configuration
/////////////////////////////////////////////////////////////////////

app.set('view engine', 'ejs');

/////////////////////////////////////////////////////////////////////
// Listener
/////////////////////////////////////////////////////////////////////

app.listen(PORT, () => console.log(
    'Listening on port', PORT,
    `http://localhost:${PORT}/`
));

/////////////////////////////////////////////////////////////////////
// Users "Database"
/////////////////////////////////////////////////////////////////////

const users = {
    1: {id: 1, name: 'Ayesha', pass: 'password'},
    2: {id: 2, name: 'Jaqueline', pass: 'abc123'}
};

/////////////////////////////////////////////////////////////////////
// Routes
/////////////////////////////////////////////////////////////////////

app.get('/test', (req, res) => {
    res.end('<html><head><title>Hello, World!</title></head><body><h1>Hello, World!</h1></body></html>');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/set-cookie', (req, res) => {
    res.cookie('Cookie 1', 1); // Hey browser, please set this cookie!
    res.cookie('Cookie Number Two', 'abc');
    res.cookie('Another Cookie!', '1234 abcd dog cat');

    res.render('set-cookie');
});

app.get('/read-cookie', (req, res) => {
    const cookies = req.cookies; // Read cookies from browser

    const templateVars = {
        cookies: cookies
    };
    res.render('read-cookie', templateVars);
});

// SHOWS THE USER THE FORM
app.get('/sign-in', (req, res) => {
    res.render('sign-in');
});

// RECEIVES A FORM SUBMISSION
app.post('/sign-in', (req, res) => {
    // console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    // console.log(users);
    for(const userID in users) {
        const userName = users[userID].name;
        const userPass = users[userID].pass;

        // If the form credentials match a real user
        if(userName === username && userPass === password) {
            res.cookie('userID', userID);
            return res.redirect('/profile');
        }
    }

    // If no match, let the user know
    res.end('Invalid credentials.');
});

app.get('/profile', (req, res) => {
    if(req.cookies.userID) {
        if(users[req.cookies.userID]) {
            const signedInUser = users[req.cookies.userID];

            const templateVars = {
                user: signedInUser
            };
            res.render('profile', templateVars);
        }
    }

    res.redirect('/sign-in');
});

app.post('/sign-out', (req, res) => {
    res.clearCookie('userID'); // Tell the browser we want a cookie GONE!
    res.redirect('/');
});
