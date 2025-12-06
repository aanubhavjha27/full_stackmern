import mongoose from 'mongoose'


export const connectDB=async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to db")
    } catch (error) {
        console.error("err connecting to db")
        process.exit(1);
    }

}