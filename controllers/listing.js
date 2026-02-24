const Listing = require("../model/listing")
const {geoMaker} = require("../utils/geoMaker")

module.exports.index=async(req,res)=>{
    let allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
}

module.exports.renderNewForn = (req,res)=>{
    res.render("./listings/new.ejs");
    console.log(req.user);
}

module.exports.showListing =async(req,res)=>{
    let {id} = req.params;
    let data = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!data){
        req.flash("error","No listing found");
        res.redirect("/listings");
        console.log("error flash created")
    }
    else{
        console.log(data)
        res.render("./listings/show.ejs",{data});
    }
    
}

module.exports.createListing = async (req, res, next) => {
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.image = {url,filename};
    newListing.owner = req.user._id;
    newListing.geometry = await geoMaker(req.body.listing.location);
    await newListing.save();
    console.log("Posted successfully");
    req.flash("success","new listing created");
    res.redirect("/listings");
}

module.exports.editListing = async(req,res)=>{
    let {id} = req.params;
    let data = await Listing.findById(id);
    if(!data){
        req.flash("error","No listing found");
        res.redirect("/listings");
        console.log("error flash created")
    } 
    else{
        //  console.log(data);
        let oUrl = data.image.url;
        oUrl = oUrl.replace('/upload',"/upload/h_300/w_250")
        res.render("./listings/edit.ejs",{data,oUrl});
    }
   
}

module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let newListing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    await newListing.save();
    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = {url,filename};
        await newListing.save();
    }
    req.flash("success","listing updated successfully");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id).then((res)=>console.log("Deleted successfully"));
    req.flash("success","listing deleted successfully");
    res.redirect("/listings");
}