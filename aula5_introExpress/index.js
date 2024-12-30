var express = require('express')
var app = express()
var port = 3000

var path = require('path')
var userRouter = require('./users/userIndex')

app.use(
    express.urlencoded({
        extended: true
    }),
)

app.use(express.json())

var basePath = path.join(__dirname, 'templates')

app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta:${port}`)
})

