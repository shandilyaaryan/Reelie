import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

if (!MONGODB_URL) {
    throw new Error("Please define mongodb URL in .env");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
};

export const connectToDatabase = async () => {
    if (cached.conn){
        return cached.conn;
    }
    if (!cached.promise){
        const opts = {
            bufferedCommands: true,
            maxPoolSize: 10
        };

        cached.promise = mongoose.connect(MONGODB_URL, opts).then(() => mongoose.connection);

    }
}