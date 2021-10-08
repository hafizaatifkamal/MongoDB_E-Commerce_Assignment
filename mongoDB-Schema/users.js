const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const dbName = "e-commerce_db";

// Users data
const usersData = [
    { first_name: "Atif", last_name: "Kamal", email: "atif.k@valuebound.com", profile_image: "", role: "Trainee" },
    { first_name: "Amit", last_name: "Kumar", email: "amit.k@valuebound.com", profile_image: "", role: "Senior Software Developer" },
    { first_name: "Yadu", last_name: "Krishna", email: "yk@valuebound.com", profile_image: "", role: "Software Engineer" },
    { first_name: "Sachin", last_name: "Nishad", email: "sachin.n@valuebound.com", profile_image: "", role: "Trainee" },
    { first_name: "Saad", last_name: "Hasan", email: "saad.h@valuebound.com", profile_image: "", role: "Trainee" }
];

async function main() {

    await client.connect();

    console.log("Connected successfully to the e-Commerce server");

    const db = client.db(dbName);

    // Insertion of users data into Users collection
    const insertUsersData = await db.collection("Users").insertMany(usersData);

    console.log(insertUsersData.insertedCount + " Users record(s) inserted successfully!");
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());