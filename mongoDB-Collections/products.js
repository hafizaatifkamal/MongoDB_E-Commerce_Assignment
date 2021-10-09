const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const dbName = "e-commerce_db";

// Products data
const productsData = [
    { Name: "Mobiles", Thumbnail: "", ProductGallery: "", Description: "", Base_Price: 12000, Sell_Price: 12499, CategoryName: "Electronics", Tags: "Amazon Best Choice", Additional_Information: "" },
    { Name: "Laptops", Thumbnail: "", ProductGallery: "", Description: "", Base_Price: 45000, Sell_Price: 49599, CategoryName: "Electronics", Tags: "Best Seller", Additional_Information: "" },
    { Name: "AirPods", Thumbnail: "", ProductGallery: "", Description: "", Base_Price: 1500, Sell_Price: 1599, CategoryName: "Electronics", Tags: "Best Seller", Additional_Information: "" },
    { Name: "Speakers", Thumbnail: "", ProductGallery: "", Description: "", Base_Price: 5500, Sell_Price: 5649, CategoryName: "Electronics", Tags: "Amazon Best Choice", Additional_Information: "" },
    { Name: "Desktops", Thumbnail: "", ProductGallery: "", Description: "", Base_Price: 10000, Sell_Price: 11499, CategoryName: "Electronics", Tags: "Editor's Choice", Additional_Information: "" }
];

async function main() {

    await client.connect();

    console.log("Connected successfully to the e-Commerce server");

    const db = client.db(dbName);

    // Insertion of Products data into Products collection
    const insertProductsData = await db.collection("Products").insertMany(productsData);

    console.log(insertProductsData.insertedCount + " record(s) inserted successfully!");



    /* Getting/filterings inserted Products data */
    const getProductsData = await db.collection("Products").find().toArray();

    // Printing Products Data
    console.log(getProductsData);




    /* Updation */
    // Passing updates into specific Products data
    let productsQuery = {
        $or: [
            { Tags: "Amazon Best Choice" },
            { Tags: "Best Seller" }
        ]
    };

    const updateProductsQuery = {
        $set: {
            Description: "Genuine Product at affordable price",
            Additional_Information: "1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box"
        }
    };

    // Updating Products data
    const updateProducts = await db.collection("Products").updateMany(productsQuery, updateProductsQuery);
    console.log(updateProducts.modifiedCount + " Products record(s) updated successfully!");






    /* Deletion */
    let productsQuery = {
        $and: [
            { Name: "Speakers" },
            { Tags: "Amazon Best Choice" }
        ]
    };

    const deleteProducts = await db.collection("Products").deleteMany(productsQuery);
    console.log(deleteProducts.deletedCount + " record(s) has been deleted!");
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());