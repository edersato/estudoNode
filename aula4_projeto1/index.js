var inquirer = require('inquirer')
var chalk = require('chalk')


var fs = require('fs')

operation()

//Operação do sistema
function operation() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'O que deseja fazer?',
                choices: [
                    'Criar Conta',
                    'Saldo',
                    'Depositar',
                    'Sacar',
                    'Sair',
                ]
            },
        ])
        .then((answer) => {
            var action = answer['action']

            if (action === 'Criar Conta') {
                createAccount()
            } else if (action === "Saldo") {
                getBalance()
            } else if (action === "Depositar") {
                deposit()
            } else if (action === "Sacar") {
                withdraw()
            } else if (action === "Sair") {
                process.exit()
            }
        })
        .catch((err) => console.log(err))
}

//Criação da conta
function createAccount() {
    console.log(chalk.green('Defina as opções da sua conta:'));

    buildAccount()
}

// build da conta
function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite o nome para sua conta'
        }
    ]).then(answer => {
        var accountName = answer['accountName']
        console.info(accountName);

        //Checa se existe a conta
        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }
        //tratamento de erro se já existe
        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black("Esta conta já existe, escolha outro nome!"))
            buildAccount()
            return
        }
        //cria a conta e armazena num json
        fs.writeFileSync(`accounts/${accountName}.json`, `{"balance": 0}`, function (err) {
            console.log(err);
        })

        console.log(chalk.green('Conta criada com sucesso'));
        operation()

    }).catch(err => console.log(err))
}

//Deposito da conta
function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da conta?'
        }
    ])
        .then((answer) => {
            var accountName = answer['accountName']

            //Verifica se a conta existe
            if (!checkAccount(accountName)) {
                return deposit()
            }
            inquirer.prompt([
                {
                    name: 'amount',
                    message: 'Qual o valor de depósito?'
                }
            ])
            .then((answer) => {
                var amount = answer['amount'];

                //Inclui Valor
                addAmount(accountName, amount)
                operation()
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
}


//// Funções gerais

//Checa conta
function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe, tente novamente'))
        return false
    }

    return true
}

//Raliza o Deposito
function addAmount(accountName, amount) {
    var accountData= getAccount(accountName)

    if(!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'))
        return deposit()        
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err);   
        }
    )    
    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`))
}

//Busca a conta
function getAccount(accountName) {
    var accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

//Checa o Saldo
function getBalance() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da conta?'
        }
    ]).then((answer) => {
        var accountName = answer['accountName']

        if(!checkAccount(accountName)) {
            return getBalance()
        }

        var accountData = getAccount(accountName)
        console.log(`O saldo da sua conta é de R$${accountData.balance}`);
        operation()
        
    }).catch((err) => console.log(err))
}

//Realiza o saque
function withdraw() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da conta?'
        }
    ]).then((answer) => {
        var accountName = answer['accountName']

        if(!checkAccount(accountName)) {
            return withdraw()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Qual o valor do saque?'
            }
        ]).then((answer) => {
            var amount = answer['amount']
            updateAmount(accountName, amount)
        }).catch((err) => console.log(err))

    }).catch((err) => console.log(err))
}

function updateAmount(accountName, amount) {

    var accountData = getAccount(accountName)

    if(!amount) {
        console.log(chalk.bgRed('ocorreu um erro, tente novamente mais tarde'))
        return
    }

    if (accountData.balance < amount) {
        console.log(chalk.bgRed('valor indisponível'));
        return withdraw()        
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(err);   
        }
    )
    console.log(`Foi realizado o saque de R$${amount} da sua conta`)
    operation()
    
}