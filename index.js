const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Set middleware for easy cookie parsing.
app.use(cookieParser());

// Set middleware for easy request body parsing.
app.use(bodyParser.urlencoded({extended: false}));

// Set middleware for static assets.
app.use(express.static('public')); // Any route that matches a file in /public will be served directly.

// Let express know we are using a template engine.
app.set('view engine', 'ejs');

const users = require('./data/users.json');

// Home page.
app.get('/', (req, res) => {
    if (typeof req.cookies.userId !== 'undefined') {
        const userId = req.cookies.userId;
        const currentUser = users.find((user) => {return user.id == userId});
        if (currentUser) {
            res.render('index', {currentUser});
        }
    }

    res.render('index', {currentUser: false});
});

app.post('/sign-in', (req, res) => {
    // const userEmail = req.body.userEmail;
    // const userPassword = req.body.userPass;

    // Object Destructuring:
    const {userEmail, userPass} = req.body;
    
    // for (const user of users)
    // users.forEach
    // users.filter
    // users.find

    const currentUser = users.find((user) => {return user.email === userEmail && user.password === userPass});

    if (currentUser) {
        console.log(`Sign in successful for user ${currentUser.id}: ${currentUser.name} (${currentUser.email})`);        
        res.cookie('userId', currentUser.id);
    } else {
        console.error(`Sign in UNSUCCESSFUL for attempted email: ${userEmail} and password: ${userPass}`);
    }

    res.redirect('/');
});

app.get('/register', (req, res) => {
    if (typeof req.cookies.userId !== 'undefined') res.redirect('/');
    res.render('register');
});

app.post('/register', (req, res) => {
    // Retrieve contents of submitted form fields:
    const {userEmail, userPass, userName, userFavouriteLanguage} = req.body;
    const newUserId = users.length + 1;
    // Add data to users array:
    users.push({
        id: newUserId,
        name: userName,
        email: userEmail,
        password: userPass,
        favouriteLanguage: userFavouriteLanguage
    });
    fs.writeFile('./data/users.json', JSON.stringify(users), {encoding: 'utf-8'}, (error) => {
        if (error) console.error(error);
        else console.log('User registered:', users[newUserId]);
    } );
    // Sign the user in:
    res.cookie('userId', newUserId);
    res.redirect('/');
});

// Handle sign-out.
app.post('/sign-out', (req, res) => {
    res.clearCookie('userId'); // Delete cookie by KEY.
    res.redirect('/'); // Send the user to the index route.
});

app.listen(port, () => {
    console.log('Express server is running on port:', port);
});
