var express = require('express');
var exphbs = require('express-handlebars')

var app = express();
var conn = require('./db/conn')

var productsRoutes = require('./routes/productsRoutes')

var hbs = exphbs.create({
    partialsDir: 'views/partials',
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



app.use(express.urlencoded({extended: true}))

app.use(express.json())
app.use(express.static('public'))
app.use('/products', productsRoutes)

app.listen(3000)