var express = require('express')
var router = express.Router()

var path = require('path')
var basePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

router.post('/save', (req, res) => {
    var name = req.body.name
    var age = req.body.age

    console.log(`O nome do usuario é ${name} e ele tem ${age} anos`);
    
})

router.get('/:id', (req, res) => {
    var id = req.params.id

    console.log(`${id}`);

    res.sendFile(`${basePath}/index.html`)
})

module.exports = router