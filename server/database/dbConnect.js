import mongoose from "mongoose";


const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            serverSelectionTimeoutMS: 30000,
        })
        console.log("Mongodb connected")
    } catch (error) {
        console.log("error occured" ,error)
    }
}
export default ConnectDB