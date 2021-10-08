const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const dbName = "e-commerce_db";

// Orders data
const ordersData = [
    { UserId: "vb005", TotalItems: 2, Products: "", BillingAddress: "", ShippingAddress: "", Transaction_Status: "", Payment_Mood: "", Order_Status: "" },
    { UserId: "vb006", TotalItems: 3, Products: "", BillingAddress: "", ShippingAddress: "", Transaction_Status: "", Payment_Mood: "", Order_Status: "" },
    { UserId: "vb007", TotalItems: 5, Products: "", BillingAddress: "", ShippingAddress: "", Transaction_Status: "", Payment_Mood: "", Order_Status: "" },
    { UserId: "vb008", TotalItems: 1, Products: "", BillingAddress: "", ShippingAddress: "", Transaction_Status: "", Payment_Mood: "", Order_Status: "" },
    { UserId: "vb009", TotalItems: 2, Products: "", BillingAddress: "", ShippingAddress: "", Transaction_Status: "", Payment_Mood: "", Order_Status: "" }
];

async function main() {

    await client.connect();

    console.log("Connected successfully to the e-Commerce server");

    const db = client.db(dbName);

    // Insertion of Orders data into Orders collection
    const insertOrdersData = await db.collection("Orders").insertMany(ordersData);

    console.log(insertOrdersData.insertedCount + " record(s) inserted successfully!");
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());