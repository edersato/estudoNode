const minimist = require('minimist')

const args = minimist(process.argv.slice(2))
console.log(args);

const nome = args["nome"]
console.log(nome);

console.log(`O nome dele é ${nome}`);
