const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const dbName = "e-commerce_db";

// Carts data
const cartsData = [
    { Product: "Mobiles", User: "Atif", Product_qty: 2, Base_Price: 12000, Sell_Price: 12499, Total_Price: 24998 },
    { Product: "Laptops", User: "Kumar", Product_qty: 3, Base_Price: 45000, Sell_Price: 49599, Total_Price: 148797 },
    { Product: "AirPods", User: "Krishna", Product_qty: 5, Base_Price: 1500, Sell_Price: 1599, Total_Price: 7995 },
    { Product: "Speakers", User: "Nishad", Product_qty: 1, Base_Price: 5500, Sell_Price: 5649, Total_Price: 5649 },
    { Product: "Desktop", User: "Hasan", Product_qty: 2, Base_Price: 10000, Sell_Price: 11499, Total_Price: 22998 }
];

async function main() {

    await client.connect();

    console.log("Connected successfully to the e-Commerce server");

    const db = client.db(dbName);

    /* Insertion of Carts data into carts collection */
    const insertCartsData = await db.collection("Carts").insertMany(cartsData);

    console.log(insertCartsData.insertedCount + " Carts record(s) inserted successfully!");




    /* Getting/filterings inserted Carts data */
    const getCartsData = await db.collection("Carts").find().toArray();

    // Printing Carts Data
    console.log(getCartsData);




    /* Updation */
    // Passing updates into specific Carts data
    let cartsQuery = { Product: "AirPods" };

    const updateCartsQuery = {
        $set: {
            Product_qty: 10,
            Total_Price: 15990
        }
    };

    // Updating Carts data
    const updateCarts = await db.collection("Carts").updateMany(cartsQuery, updateCartsQuery);
    console.log(updateCarts.modifiedCount + " Carts record(s) updated successfully!");






    /* Deletion */
    let cartsQuery = { User: "Nishad" };

    const deleteCart = await db.collection("Carts").deleteMany(cartsQuery);
    console.log(deleteCart.deletedCount + " record(s) has been deleted!");
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());