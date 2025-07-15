/** @format */

import mongoose from "mongoose"

async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGO_URI)
		console.log("Connected to the database")
	} catch (error) {
        console.log("Unable to connect to the database", error);
    }
}

export default connectDB;
