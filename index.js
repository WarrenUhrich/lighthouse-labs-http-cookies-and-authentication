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
    const templateVars = {
        pageName: 'Sign In',
    };
    res.render('index', templateVars);
});
