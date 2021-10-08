const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const dbName = "e-commerce_db";

// Categories data
const categoriesData = [
    { Name: "Mobile Accessories", Slug: "", image: "../images/mobile-accessories-collection.jpg", Description: "Great India Festival is going. Go grab the offer!" },
    { Name: "Laptops", Slug: "", image: "../images/laptops-collections.jpg", Description: "Buy Laptops at affordable price from the best collection" },
    { Name: "AirPods", Slug: "", image: "../images/airpods-accessories-collection.jpg", Description: "Impression jamana hai bhai to AirPods purchase karlo..." },
    { Name: "Speakers", Slug: "", image: "../images/speakers-collection.jpg", Description: "Create your own home theatre and Celebrate!" },
    { Name: "Desktops", Slug: "", image: "../desktops-collection.jpg", Description: "Desktops are always helpful." }
];

async function main() {

    await client.connect();

    console.log("Connected successfully to the e-Commerce server");

    const db = client.db(dbName);

    /* Insertion of Categories data into Categories collection */
    const insertCategoriesData = await db.collection("Categories").insertMany(categoriesData);

    console.log(insertCategoriesData.insertedCount + " Categories record(s) inserted successfully!");





    /* Getting/filterings inserted Categories data */
    const getCategoriesData = await db.collection("Categories").find().toArray();

    // Printing Categories Data
    console.log(getCategoriesData);




    /* Updation */
    // Passing updates into specific Categories data
    let categoriesQuery = { Name: "AirPods" };

    const updateCategoriesQuery = {
        $set: { Description: "Impression jamana hai bhai to AirPods purchase karlo...\nAs Zakir says, Bag jama sakte hain" }
    };

    // Updating Categories data
    const updateCategories = await db.collection("Categories").updateMany(categoriesQuery, updateCategoriesQuery);
    console.log(updateCategories.modifiedCount + " Categories record(s) updated successfully!");






    /* Deletion */
    let categoriesQuery = { Description: "Desktops are always helpful." };

    const deleteCategories = await db.collection("Categories").deleteMany(categoriesQuery);
    console.log(deleteCategories.deletedCount + " record(s) has been deleted!");

}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());