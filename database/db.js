import mongoose from "mongoose";
import "dotenv/config";



export const connectDB= async ()=>{
    try {
        const MONGODB_URI = process.env.MONGODBURI;

await mongoose
  .connect(MONGODB_URI)
  .then((res) => {
    console.log("mongodb connected...");
  })
  .catch((err) => {
    console.log(err);
  });
    } catch (error) {
        console.log(error);
        
    }
}


