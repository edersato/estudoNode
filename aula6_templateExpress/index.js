var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

var hbs = exphbs.create({
    partialsDir: 'views/partials',
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/dashboard', function(req, res) {

    var items = [
        {name: 'Item 1', price: 100},
        {name: 'Item 2', price: 200},
        {name: 'Item 3', price: 300},
    ]

    res.render('dashboard', {items});
});

app.get('/post', function(req, res) {
    
    var post = {
        title: 'Post Title',
        content: 'Post Content',
        body: 'Post Body',
        comments: 5,
    }

    res.render('blogpost', {post});
})

app.get('/blog', function(req, res) {
    var posts = [
        {title: 'Post 1', content: 'Content 1'},
        {title: 'Post 2', content: 'Content 2'},
        {title: 'Post 3', content: 'Content 3'},
    ]

    res.render('blog', {posts});
});


app.get('/', function(req, res) {

    var user = {
        name: 'John',
        age: 30,
    }

    var auth = true

    res.render('home', {user: user, auth});
})

app.listen(3000, function() {
    console.log('Server running on port 3000');
});