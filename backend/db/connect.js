import mongoose from "mongoose";

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to mongo");
    } catch (error) {
        console.log('error connecting to Mongo',error.message);
    }
}
export default connectToMongo;