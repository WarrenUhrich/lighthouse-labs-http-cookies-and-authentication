const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

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

const users = [
    {
        id: 1, 
        email: 'hello@warren.codes', 
        name: 'Warren', 
        password: 'testing123',
        favouriteLanguage: 'PHP'
    },
    {
        id: 2, 
        email: 'sneha@sneha.ca', 
        name: 'Sneha', 
        password: 'b3tterp4ss',
        favouriteLanguage: 'Ladder Logic'
    }
];

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

app.listen(port, () => {
    console.log('Express server is running on port:', port);
});
