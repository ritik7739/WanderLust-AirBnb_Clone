const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const initData=require("./data.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

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
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();
