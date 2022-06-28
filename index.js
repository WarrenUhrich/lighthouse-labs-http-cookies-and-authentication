const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();

app.use(express.static('public')); // Choose a directory to serve files from... (images, CSS, JS, videos.)
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log('Express server running on port:', PORT);
});

const users = [
    {id: 1, name: 'Harinder', pass: 'Password123'},
    {id: 2, name: 'Hope', pass: 'b3tt3rp4ss'},
];

// Cookie read and write test.
app.get('/test', (req, res) => {
    // Reading a cookie from the req.cookies object.
    console.log('Cookie Received on Back-end:', req.cookies['test cookie']);
    // Writing a cookie (key, value).
    res.cookie('test cookie', 'This is a test!');
    // Send HTML to browser.
    res.end('<html><head><title>test</title></head><body>test</body></html>');
});

app.get('/', (req, res) => {
    const userID = req.cookies.userID;

    let currentUser = false;

    for (const user of users) {
        if (userID == user.id) {
            currentUser = user;
        }
    }

    const templateVars = {
        pageName: 'Sign In',
        user: currentUser
    };
    res.render('index', templateVars);
});

app.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.pass;

    let currentUser = false;

    for (const user of users) {
        if (user.name == username && user.pass == password) {
            currentUser = user;
        }
    }

    if (currentUser) {
        res.cookie('userID', currentUser.id);
    }

    console.log('User:', username, 'Password:', password);
    res.redirect('/');
});

app.post('/sign-out', (req, res) => {
    res.clearCookie('userID'); // Destroy the cookie (by key)!
    res.redirect('/');
});
