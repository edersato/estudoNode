const chalk = require("chalk")

const nota = 9

if (nota >= 6) {
    console.log(chalk.green("Parabéns, você foi aprovado"));
} else {
    console.log(chalk.bgRed("Que pena, você reprovou"));
}

setTimeout(() => {
    console.clear()
}, 2000);