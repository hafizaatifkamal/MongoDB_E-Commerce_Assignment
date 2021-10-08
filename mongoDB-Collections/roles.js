const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const dbName = "e-commerce_db";

// Roles data
const rolesData = [
    { Name: "Trainee", Slug: "" },
    { Name: "Senior Software Developer", Slug: "" },
    { Name: "Software Engineer", Slug: "" },
    { Name: "Trainee", Slug: "" },
    { Name: "Trainee", Slug: "" }
];

async function main() {

    await client.connect();

    console.log("Connected successfully to the e-Commerce server");

    const db = client.db(dbName);

    // Insertion of Roles data into Roles collection
    const insertRolesData = await db.collection("Roles").insertMany(rolesData);

    console.log(insertRolesData.insertedCount + " Roles record(s) inserted successfully!");
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());