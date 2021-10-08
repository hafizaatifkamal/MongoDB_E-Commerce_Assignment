const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const dbName = "e-commerce_db";

// Tags data
const tagsData = [
    { Name: "", Slug: "" },
    { Name: "", Slug: "" },
    { Name: "", Slug: "" },
    { Name: "", Slug: "" },
    { Name: "", Slug: "" }
];

async function main() {

    await client.connect();

    console.log("Connected successfully to the e-Commerce server");

    const db = client.db(dbName);

    // Insertion of Tags data into Tags collection
    const insertTagsData = await db.collection("Tags").insertMany(tagsData);

    console.log(insertTagsData.insertedCount + " Tags record(s) inserted successfully!");
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());