const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
