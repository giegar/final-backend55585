import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export default {
    PORT: process.env.PORT ,
    MONGO_URL: process.env.MONGO_URL,
    DB_NAME: process.env.DB_NAME,
    SECRET_SESSION: process.env.SECRET_SESSION,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}

export const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL,{dbName: process.env.DB_NAME})
        console.log('DataBase Connected')
    } catch (error){
        console.log(`Error Mongoose Connection ${error}`)
        process.exit(1)
    }
}