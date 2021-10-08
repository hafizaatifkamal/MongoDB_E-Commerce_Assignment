const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

async function main() {

    await client.connect();

    console.log("Connected successfully to the e-Commerce server");

    return "Welcome to MongoDB world!";
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());