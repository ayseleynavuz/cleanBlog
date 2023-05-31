const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();
const Post = require("./models/Post");

//connect DB
mongoose.connect("mongodb://127.0.0.1:27017/cleanblog-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));

//TEMPLATE ENGINE
app.set('view engine', 'ejs'); // set the view engine to ejs

// MIDDLEWARE
app.use(express.static('public')); // to access the files in public folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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

app.post("/posts", async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
});


const port = 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});