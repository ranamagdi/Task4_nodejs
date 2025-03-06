const { MongoClient } = require("mongodb"); // Modern import

const connectionUrl = "mongodb://127.0.0.1:27017";
const dbName = "Task1-db";

async function main() {
    const client = new MongoClient(connectionUrl);

    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");

        const db = client.db(dbName);
        const usersCollection = db.collection("users");

        //  Insert two documents using insertOne()
        await usersCollection.insertOne({ name: "ahmed", age: 20 });
        await usersCollection.insertOne({ name: "reem", age: 24 });

        console.log("Inserted two documents with insertOne");

        //  Insert 10 documents using insertMany()
        const insertManyResult = await usersCollection.insertMany([
            { name: "ahmed", age: 27 },
            { name: "reem", age: 27 },
            { name: "mohamed", age: 27 },
            { name: "sara", age: 27 },
            { name: "ali", age: 27 },
            { name: "nada", age: 25 },
            { name: "nour", age: 25 },
            { name: "noura", age: 25 },
            { name: "nada", age: 25 },
            { name: "nour", age: 25 }
        ]);

        console.log(`Inserted ${insertManyResult.insertedCount} documents using insertMany`);

        //  Find all users where age = 27
        const usersWithAge27 = await usersCollection.find({ age: 27 }).toArray();
        console.log("Users with age 27:", usersWithAge27);

        //  Count users where age = 27
        const countAge27 = await usersCollection.find({ age: 27 }).count();
        console.log(`Count of users with age 27: ${countAge27}`);

        //  Find first 3 users with age = 27
        const first3UsersWithAge27 = await usersCollection.find({ age: 27 }).limit(3).toArray();
        console.log("First 3 users with age 27:", first3UsersWithAge27);

        //  Count users with age = 27 
        const countAgelimit27 = await usersCollection.find({ age: 27 }).limit(3).count();
        console.log(`Count of users with age 27: ${countAgelimit27}`);

    } catch (error) {
        console.error("Error occurred:", error);
    } finally {
        await client.close();
    }
}

main();
