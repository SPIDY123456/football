const {MongoClient, ObjectId} = require('mongodb');

const uri = 'mongodb://localhost:27017/';
const dbName = "international";
const collectionName ="footballer";


const client = new MongoClient(uri);

async function connectDB() {
    try {
        // if (!client.topology || !client.topology.isConnected()){
            await client.connect();
            // console.log("Database connected");
        return client.db(dbName).collection(collectionName);
    }
    catch(error){
        console.error("Error connecting to MongoDB", error)
         throw  Error("MongoDb Connection Fail");
    }
}

const UserModel = {
    async createUser(user) {
        try {
            const collection = await connectDB();
            return await collection.insertOne(user);
        } catch (error) {
            console.error("Error creating user:", error);
            throw  Error("Failed to create user");
        }
    },

    async getAllUsers() {
        try {
            const collection = await connectDB();
            return await collection.find({}).toArray();
        } catch (error) {
            console.error("Error fetching users:", error);
            throw  Error("Failed to fetch users");
        }
    },

    async getUserById(id) {
        try {
            const collection = await connectDB();
            return await collection.findOne({ _id: new ObjectId(id) });
        }catch (error) {
            console.error("Error fetching user by ID:", error);
            throw new Error("Failed to fetch user by ID");
        }
    },

    async updateUser(id, user) {
        try {
            const collection = await connectDB();
            return await collection.updateOne({ _id:  new ObjectId(id) }, { $set: user });
        } catch (error) {
            console.error("Error updating user:", error);
            throw Error("Failed to update user");
        }
    },

    async deleteUser(id) {
        try {

            const collection = await connectDB();
            return await collection.deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.error("Error deleting user:", error);
            throw Error("Failed to delete user");
        }
    }
};

module.exports = UserModel;

