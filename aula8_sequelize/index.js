var express = require('express');
var expbs = require('express-handlebars');
var conn = require('./db/conn');

var User = require('./models/User');
var app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.engine('handlebars', expbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', async (req, res) => {

    var users = await User.findAll({raw: true});

    console.log(users);    

    res.render('home', {users: users});
});

app.get('/users/create', (req, res) => {
    res.render('adduser');
});

app.post('/users/create', async (req, res) => {
    var name = req.body.name;
    var occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if(newsletter == 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    console.log(req.body);
    

    await User.create({name, occupation, newsletter})

    res.redirect('/');
});

conn.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running');
    });
}).catch((error) => {
    console.log('Error: ', error);
});