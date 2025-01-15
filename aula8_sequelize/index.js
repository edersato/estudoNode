var express = require('express');
var expbs = require('express-handlebars');
var conn = require('./db/conn');

var User = require('./models/User');
var Address = require('./models/Address');

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

app.post('/users/create', (req, res) => {
    var name = req.body.name
    var occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter == 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    console.log(req.body);
    

    User.create({name, occupation, newsletter})

    res.redirect('/');
});

app.get('/users/:id', async (req, res) => {
    var id = req.params.id

    var user = await User.findOne({raw: true, where: {id: id} })

    res.render('userview', { user })
})

app.post('/users/delete/:id', async (req, res) => {
    var id = req.params.id

    await User.destroy({where: {id: id} })

    res.redirect('/')
})

app.get('/users/edit/:id', async (req, res) => {
    var id = req.params.id

    try {
        var user = await User.findOne({include: Address, where: {id: id} })
    
        res.render('useredit', {user: user.get({plain: true})})
        
    } catch (error) {
        console.log(error);
        
    }

})

app.post('/users/update', async (req, res) => {
    var id = req.body.id
    var name = req.body.name
    var occupation = req.body.occupation
    var newsletter = req.body.newsletter

    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    var userData = {
        id, name, occupation, newsletter
    }

    await User.update(userData, {where: {id: id} }) 

    res.redirect('/')

})

app.post('/address/create', async (req, res) => {
    var UserId = req.body.UserId
    var street = req.body.street
    var number = req.body.number
    var city = req.body.city

    var address = { UserId, street, number, city, }

    await Address.create(address)

    res.redirect(`/users/edit/${UserId}`)

})

app.post('/address/delete/', function (req, res) {
    const id = req.body.id
  
    Address.destroy({
      where: {
        id: id,
      },
    })
      .then(res.redirect('/'))
      .catch((err) => console.log(err))
  })

conn.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running');
    });
}).catch((error) => {
    console.log('Error: ', error);
});