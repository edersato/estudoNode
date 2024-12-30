const fs = require("fs");

console.log("inicio");
fs.writeFileSync('arquivo2.txt', 'oi', function(err) {
    setTimeout(function() {
        console.log('Arquivo Criado');
    }, 1000)
})
console.log('fim');

setTimeout(() => {
    console.clear();
}, 2000);