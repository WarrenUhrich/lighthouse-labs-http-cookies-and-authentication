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

app.get('/', (req, res) => {
    res.end('Hello, World!');
});
