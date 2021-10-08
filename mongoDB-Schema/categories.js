const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const dbName = "e-commerce_db";

// Categories data
const categoriesData = [
    { Name: "", Slug: "", image: "", Description: "" },
    { Name: "", Slug: "", image: "", Description: "" },
    { Name: "", Slug: "", image: "", Description: "" },
    { Name: "", Slug: "", image: "", Description: "" },
    { Name: "", Slug: "", image: "", Description: "" }
];

async function main() {

    await client.connect();

    console.log("Connected successfully to the e-Commerce server");

    const db = client.db(dbName);

    // Insertion of Categories data into Categories collection
    const insertCategoriesData = await db.collection("Categories").insertMany(categoriesData);

    console.log(insertCategoriesData.insertedCount + " Categories record(s) inserted successfully!");
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());