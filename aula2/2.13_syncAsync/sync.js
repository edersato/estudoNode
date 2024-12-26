const fs = require("fs");

console.log("inicio");
fs.writeFileSync('arquivo.txt', 'oi')
console.log('fim');

setTimeout(() => {
    console.clear();
}, 1000);