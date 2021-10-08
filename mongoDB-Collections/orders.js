const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const dbName = "e-commerce_db";

// Orders data
const ordersData = [
    { UserId: "vb005", TotalItems: 2, Products: "Mobiles", BillingAddress: "Kolkata", ShippingAddress: "Kolkata", Transaction_Status: "Active", Payment_Mood: "Cash On Delivery", Order_Status: "Dispatched" },
    { UserId: "vb006", TotalItems: 3, Products: "Laptops", BillingAddress: "Banglore", ShippingAddress: "Patna", Transaction_Status: "Active", Payment_Mood: "Online", Order_Status: "Out For Delivery" },
    { UserId: "vb007", TotalItems: 5, Products: "AirPods", BillingAddress: "Banglore", ShippingAddress: "Hyderabad", Transaction_Status: "Active", Payment_Mood: "Online", Order_Status: "Order Booked" },
    { UserId: "vb008", TotalItems: 1, Products: "Speaker", BillingAddress: "Mumbai", ShippingAddress: "Mumbai", Transaction_Status: "Inactive", Payment_Mood: "Online", Order_Status: "Delivered" },
    { UserId: "vb009", TotalItems: 2, Products: "Desktops", BillingAddress: "Banglore", ShippingAddress: "Sasaram", Transaction_Status: "Inactive", Payment_Mood: "Bank Chalan", Order_Status: "Delivered" }
];

async function main() {

    await client.connect();

    console.log("Connected successfully to the e-Commerce server");

    const db = client.db(dbName);

    /* Insertion of Orders data into Orders collection */
    const insertOrdersData = await db.collection("Orders").insertMany(ordersData);

    console.log(insertOrdersData.insertedCount + " record(s) inserted successfully!");




    /* Getting/filterings inserted Orders data */
    const getOrdersData = await db.collection("Orders").find().toArray();

    // Printing Orders Data
    console.log(getOrdersData);




    /* Updation */
    // Passing updates into specific Orders data
    let ordersQuery = {
        $and: [
            { BillingAddress: "Banglore" },
            { Transaction_Status: "Active" }
        ]
    };

    const updateOrdersQuery = {
        $set: {
            Order_Status: "Cancelled Order",
            Transaction_Status: "Inactive",
            Payment_Mood: null
        }
    };

    // Updating Orders data
    const updateOrders = await db.collection("Orders").updateMany(ordersQuery, updateOrdersQuery);
    console.log(updateOrders.modifiedCount + " Orders record(s) updated successfully!");






    /* Deletion */
    let ordersQuery = {
        $or: [
            { BillingAddress: "Banglore" },
            { ShippingAddress: "Hyderabad" }
        ]
    };

    const deleteOrders = await db.collection("Orders").deleteMany(ordersQuery);
    console.log(deleteOrders.deletedCount + " record(s) has been deleted!");
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());