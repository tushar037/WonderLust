const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listeningschema = new schema({
    
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    
    image: {
        type: Object,
           properties: {
              filename: { type: String },
             url: { type: String}},

        default:"https://unsplash.com/photos/thatch-huts-and-houses-by-the-pool-during-day--27u_GzlAFw",
        set:(v)=> v===""? "https://unsplash.com/photos/thatch-huts-and-houses-by-the-pool-during-day--27u_GzlAFw":v
        
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    }
});

const listing = mongoose.model("listing",listeningschema);

module.exports=listing;