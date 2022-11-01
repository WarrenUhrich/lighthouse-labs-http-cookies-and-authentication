const express = require('express');
// const cookieParser = require('cookie-parser');

const PORT = 7777;
const app = express();

app.set('view engine', 'ejs');

app.listen(PORT, () => {
  console.log('Express application listening on port:', PORT);
});

app.get('/', (req, res) => {
  res.render('index');
});
