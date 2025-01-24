var { MongoClient } = require('mongodb')

var uri = "mongodb://127.0.0.1:27017/testemongodb"

var client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Conectando ao mongoDB");
        
    } catch (err) {
        console.error(err);
        
    }
}

run()

module.exports = client