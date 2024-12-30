var express = require('express')
var app = express()
var port = 3000

var path = require('path')
var basePath = path.join(__dirname, 'templates')

app.use(
    express.urlencoded({
        extended: true
    }),
)

app.use(express.json())

var checkAuth = function (req, res, next) {
    req.authStatus = true
  
    if (req.authStatus) {
      console.log('Está logado, pode continuar')
      next()
    } else {
      console.log('Não está logado, faça o login para continuar!')
    }
  }
  
  app.use(checkAuth)


app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save', (req, res) => {
    var name = req.body.name
    var age = req.body.age

    console.log(`O nome do usuario é ${name} e ele tem ${age} anos`);
    
})

app.get('/users/:id', (req, res) => {
    var id = req.params.id

    console.log(`${id}`);

    res.sendFile(`${basePath}/index.html`)
})


app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta:${port}`)
})

