const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const dbName = "e-commerce_db";

// Tags data
const tagsData = [
    { Name: "Amazon Best Choice", Slug: "" },
    { Name: "Best Seller", Slug: "" },
    { Name: "Best Seller", Slug: "" },
    { Name: "Amazon Best Choice", Slug: "" },
    { Name: "Editor's Choice", Slug: "" }
];

async function main() {

    await client.connect();

    console.log("Connected successfully to the e-Commerce server");

    const db = client.db(dbName);

    // Insertion of Tags data into Tags collection
    const insertTagsData = await db.collection("Tags").insertMany(tagsData);

    console.log(insertTagsData.insertedCount + " Tags record(s) inserted successfully!");




    /* Getting/filterings inserted Tags data */
    const getTagsData = await db.collection("Tags").find().toArray();

    // Printing Tags Data
    console.log(getTagsData);




    /* Updation */
    // Passing updates into specific Tags data
    let tagsQuery = { Name: "Best Seller" };

    const updateTagsQuery = {
        $set: { Name: "Best Seller & Editor's Choice" }
    };

    // Updating Tags data
    const updateTags = await db.collection("Tags").updateMany(tagsQuery, updateTagsQuery);
    console.log(updateTags.modifiedCount + " Tags record(s) updated successfully!");






    /* Deletion */
    let tagsQuery = { Name: "Editor's Choice" };

    const deleteTags = await db.collection("Tags").deleteMany(tagsQuery);
    console.log(deleteTags.deletedCount + " record(s) has been deleted!");
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());