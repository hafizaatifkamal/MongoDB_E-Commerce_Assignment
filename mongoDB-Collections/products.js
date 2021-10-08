const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const dbName = "e-commerce_db";

// Products data
const productsData = [
    { Name: "", Thumbnail: "", ProductGallery: "", Description: "", Base_Price: 12000, Sell_Price: 12499, CategoryName: "", Tags: "", Additional_Information: "" },
    { Name: "", Thumbnail: "", ProductGallery: "", Description: "", Base_Price: 45000, Sell_Price: 49599, CategoryName: "", Tags: "", Additional_Information: "" },
    { Name: "", Thumbnail: "", ProductGallery: "", Description: "", Base_Price: 1500, Sell_Price: 1599, CategoryName: "", Tags: "", Additional_Information: "" },
    { Name: "", Thumbnail: "", ProductGallery: "", Description: "", Base_Price: 5500, Sell_Price: 5649, CategoryName: "", Tags: "", Additional_Information: "" },
    { Name: "", Thumbnail: "", ProductGallery: "", Description: "", Base_Price: 10000, Sell_Price: 11499, CategoryName: "", Tags: "", Additional_Information: "" }
];

async function main() {

    await client.connect();

    console.log("Connected successfully to the e-Commerce server");

    const db = client.db(dbName);

    // Insertion of Products data into Products collection
    const insertProductsData = await db.collection("Products").insertMany(productsData);

    console.log(insertProductsData.insertedCount + " record(s) inserted successfully!");
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());