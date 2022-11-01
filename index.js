const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

///////////////////////////////////////////////////////////////////
// Data
///////////////////////////////////////////////////////////////////

const users = {
  1: {id: 1, email: 'hello@warren.codes', password: 'testing123'},
  2: {id: 2, email: 'sarah@lighthouselabs.ca', password: 'b3ttahp4ss'}
};

///////////////////////////////////////////////////////////////////
// Set-Up / Configuration
///////////////////////////////////////////////////////////////////

const PORT = 7777;
const app = express();

app.set('view engine', 'ejs');

///////////////////////////////////////////////////////////////////
// Middleware
///////////////////////////////////////////////////////////////////

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser());

///////////////////////////////////////////////////////////////////
// Listener
///////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log('Express application listening on port:', PORT);
});

///////////////////////////////////////////////////////////////////
// Routes
///////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  console.log('cookies:', req.cookies);

  console.log('my-first-cookie:', req.cookies['my-first-cookie']);
  console.log('mySecondCookie:', req.cookies.mySecondCookie);

  res.cookie('my-first-cookie', '123');
  res.cookie('mySecondCookie', 'Testing, 1 2 3!')
  res.render('index');
});

// SHOW the form...
app.get('/sign-in', (req, res) => {
  res.render('sign-in');
});

// Form was SUBMITTED!
app.post('/sign-in', (req, res) => {
  console.log('req.body', req.body);

  for(const userId in users) {
    if (users[userId].email === req.body.email && users[userId].password === req.body.pass) {
      res.cookie('userId', userId);
      res.redirect('/hidden-page');
    }
  }

  res.redirect('sign-in');
});

app.get('/hidden-page', (req, res) => {
  if(req.cookies.userId && users[req.cookies.userId]) {
    const templateVars = {
      email: users[req.cookies.userId].email
    };

    res.render('hidden-page', templateVars);
  }
  res.redirect('sign-in');
});
