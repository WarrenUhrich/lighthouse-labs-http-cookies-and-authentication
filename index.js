const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log('Express server running on port:', PORT);
});

// Cookie read and write test.
app.get('/test', (req, res) => {
    // Writing a cookie (key, value).
    res.cookie('test cookie', 'This is a test!');
    // Reading a cookie from the req.cookies object.
    console.log('Cookie Received on Back-end:', req.cookies['test cookie']);
    res.end('<html><head><title>test</title></head><body>test</body></html>');
});
