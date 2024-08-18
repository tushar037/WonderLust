const mongoose = require ("mongoose");
const initdata = require ("./data.js");

const listing = require("../models/listing.js");


const url = "mongodb://127.0.0.1:27017/airbnb";

main().then(()=>{
    console.log("connection  sucess");
}).catch((err)=> {
    console.log(err);
})

async function main(){
    await mongoose.connect(url);
}

const initDB = async()=> {
    await listing.deleteMany({});
    await listing.insertMany(initdata.data);
    console.log("love you!");
}

initDB();

