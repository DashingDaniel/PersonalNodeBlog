const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const Blog = require('./models/blog');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));


app.set('views',path.join(__dirname,'views'));
app.set('view engine',"ejs");

app.get('/',(req,res)=>{
    Blog.find()
    .then((posts)=>{
        res.render('index',{allposts: posts});
    });

});

app.post('/readmore/:id',(req,res)=>{
    Blog.findById(req.params.id)
    .then((post)=>{
        res.render('more',{post:post});
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT);