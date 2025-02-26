import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!

let cached = global.mongoose

if (!cached){
    cached = global.mongoose = { conn: null, promise: null}
}

export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }

        cached.promise = mongoose.connect(MONGODB_URL, opts).then(() => mongoose.connection)
    }

    try{
        cached.conn = await cached.promise
    } catch {
        throw new Error("Error connecting to the database.")
    }
}