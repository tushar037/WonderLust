const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const listing = require("./models/listing.js");
const methodOverride =require("method-override");

const { log, error } = require("console");





const url = "mongodb://127.0.0.1:27017/airbnb";

main()
.then(()=>{
    console.log("connection  success");
})
.catch((err)=> {
    console.log(err);
})


async function main(){
    await mongoose.connect(url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.get("/", (req, res)=> {
    res.send("Hello world!")
})
//Index Route
app.get("/listing", async (req, res) => {
    const allListings = await listing.find({});
    res.render("listings/index.ejs", {allListings});
});

//New Route
app.get("/listing/new", (req, res) =>{
    res.render("./listings/new.ejs"); 
});


//Show Route
app.get("/listing/:id",async(req, res)=>{
     let {id} = req.params;
     const Listing = await listing.findById(id)
     res.render("listings/show.ejs", { Listing });
});


//Create Route
app.post("/listing", async (req, res) =>{
   const newListing = new listing(req.body.listing);
   await newListing.save();
   res.redirect("/listing/");
})

// Edit Route
app.get("/listing/:id/edit", async (req, res) =>{
    let {id} = req.params;
    const Listing = await listing.findById(id);
    res.render("listings/edit.ejs", {Listing});
})

// Update Route
app.put("/listing/:id", async (req, res) =>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`../listing/${id}`);
});

// // Delete Route
// app.delete("/listing/:id", async (req, res) =>{
//     let {id} = req.params;
//     let deleteListing = await listing.findByIdAndDelete(id);
//     console.log(deleteListing)
//     res.redirect("/listing")
// })

// Delete Route 
app.get("/listing/:id", async (req,res) =>{
    let {id} = req.params;
    let deleteListing = await listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listing")
})


  

// app.get("/testing", async(req, res)=> {
//     let samplelisting = new listing({
//         title:"villa",
//         description:"Near to the Historical city",
//         price: 10000,
//         location: "Pune",
//         country:"India"
//     });

//     await samplelisting.save();
//     console.log("data Saved");
//     res.send("Sucesss!")
// })

app.listen(3000, () =>{
    console.log("server listening to port 3000");
})  