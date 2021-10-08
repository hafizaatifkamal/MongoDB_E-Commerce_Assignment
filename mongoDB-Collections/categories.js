const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const dbName = "e-commerce_db";

// Categories data
const categoriesData = [
    { Name: "Mobile Accessories", Slug: "", image: "../images/mobile-accessories-collection.jpg", Description: "" },
    { Name: "Laptops", Slug: "", image: "../images/laptops-collections.jpg", Description: "" },
    { Name: "Airpods", Slug: "", image: "../images/airpods-accessories-collection.jpg", Description: "" },
    { Name: "Speakers", Slug: "", image: "../images/speakers-collection.jpg", Description: "" },
    { Name: "Desktops", Slug: "", image: "../desktops-collection.jpg", Description: "" }
];

async function main() {

    await client.connect();

    console.log("Connected successfully to the e-Commerce server");

    const db = client.db(dbName);

    // Insertion of Categories data into Categories collection
    const insertCategoriesData = await db.collection("Categories").insertMany(categoriesData);

    console.log(insertCategoriesData.insertedCount + " Categories record(s) inserted successfully!");

    // let catQuery = { Name: { $exists: true, $eq: "" } };

    // /* Updating empty name field */
    // const updateCatQuery = {
    //     $set: { Name: "Mobiles" }
    // };

    // const updateCategories = await db.collection("Cotegories")
    //     .updateMany(catQuery, updateCatQuery);

    // console.log(updateCategories.modifiedCount + " Categories records updated!");
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());