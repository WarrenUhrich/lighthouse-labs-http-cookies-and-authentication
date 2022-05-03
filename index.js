const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// Set middleware for static assets.
app.use(express.static('public')); // Any route that matches a file in /public will be served directly.

// Let express know we are using a template engine.
app.set('view engine', 'ejs');

// Home page.
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log('Express server is running on port:', port);
});
