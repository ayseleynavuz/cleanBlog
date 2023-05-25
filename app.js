const express = require('express');
const ejs = require('ejs');

const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs'); // set the view engine to ejs

// MIDDLEWARE
app.use(express.static('public')); // to access the files in public folder

//ROUTES
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/post', (req, res) => {
    res.render('post');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});