const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const ejs = require("ejs");
const fs = require("fs"); //klasör oluşturma
const pageController = require('./controllers/pageControllers');
const postController = require('./controllers/postControllers');
const Post = require("./models/Post");
const dotenv = require('dotenv').config();

 

const app = express();

//connect DB

// genel bağlantı dizesi: mongoose.connect("mongodb+srv://username:<password>@cluster0.ibjoeof.mongodb.net/");
// compass üzerinden bağlantı için : mongodb://127.0.0.1:27017/cleanblog-test-db

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));

//TEMPLATE ENGİNE
app.set("view engine", "ejs");

//MiddleWares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//Routes
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/posts/edit/:id', pageController.getEditPage);
app.get("/about", pageController.getAboutPage);
app.get("/add_post", pageController.getAddPage);



const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});