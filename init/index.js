const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const dotenv=require("dotenv");
const initData=require("./data.js");
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const MONGO_URL = process.env.MONGO_URI;

main().then(()=>{
    console.log("sucessfully connected to DB");
}).catch((err)=>{
    console.log("ERROR",err);
});
async function main() {
    await mongoose.connect(MONGO_URL);    
};

const initDB=async ()=>{
    await Listing.deleteMany({});
    console.log("DataBase data  is deleted sucessfully");
    initData.data=initData.data.map((obj)=>({...obj,owner:"67048bcb07f63a61d43ce5d3"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();
