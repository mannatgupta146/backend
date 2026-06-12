import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../models/user.model.js";

let mongoServer;

export const connect = async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
}

export const disconnect = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.disconnect()
    await mongoServer.stop()
}

export const clearCollection = async () => {
    const collections = mongoose.connection.collections
    for(const key in collections){
        await collections[key].deleteMany({});
    }
}

beforeAll(async () => await connect());
afterAll(async () => await disconnect());
afterEach(async () => await clearCollection());

describe("User Model Test", () => {
    it("Create a user and save successfully", async () => {
        const validateUser = new User({ name: "John Doe", email: "johndoe@examole.com"})
        const savedUser = await validateUser.save();
        expect(savedUser.name).toBe("John Doe");
        expect(savedUser.email).toBe("johndoe@examole.com");
    })
})