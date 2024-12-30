const minimist = require('minimist')

//Externo

//Interno
const soma = require('./soma').soma
const args = minimist(process.argv.slice(2))

const a = pasrseInt(args['a'])
const b = pasrseInt(args['b'])

soma(a, b)