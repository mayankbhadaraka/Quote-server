import mongoose from "mongoose";
import { config } from "dotenv";
config()


mongoose.connect(process.env.Mongo_URI,{
    useNewUrlparser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log("Connected to MongoDB")
})
mongoose.connection.on('error',(err)=>{
    console.log("Error While Connecting",err)
})

