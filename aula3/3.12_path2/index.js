const path = require('path');

//resolve
console.log(path.resolve('teste.txt'));

//join
var midFolder = 'relatorios'
var fileName = 'eder.txt'

var finalPath = path.join("/", 'arquivos', midFolder, fileName)
console.log(finalPath);
