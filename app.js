if(process.env.NODE_ENV!="production")require("dotenv").config();

const express = require("express");
const multer  = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' });
const mongoose = require("mongoose");
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listingsRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const user = require("./model/user.js");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");


app.engine("ejs", engine);





const sessionOptions = {
    secret : "superSecretCode",
    resave : false,
    saveUninitialized : true,
    cookie:{
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly:true
    }
};

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.send("Hello");
});


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.get("/demoUser",async(req,res)=>{
    let fakeUser = new user({email:"abc@gmal.com",username:"fakestudent"});
    let regUser=await user.register(fakeUser,"123456");
    res.send(regUser);
});

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,"/public")));



async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
};



app.use("/listings",listingsRouter);

app.use("/listings/:id/reviews",reviewRouter);

app.use("/",userRouter);









app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong" } = err;
    console.log(err)
    res.render("error.ejs",{err});
});

app.all(/.*/,(req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

app.listen(3000,()=>{
    console.log("app is listeninig on port",port);
});


main().then(()=>{
    console.log("Connected successfully");
}).catch((e)=>{
    console.log(e);
});












// app.get("/testListing",async(req,res)=>{
//     let sampleListing = new listing({
//         title: "Mountain View Retreat",
//         description: "A peaceful and beautiful retreat in the mountains with stunning views.",
//         image: "https://unsplash.com/photos/a-multi-story-building-is-seen-under-a-cloudy-sky-apLvNw99aQQ", // Will be transformed by `set` into full URL
//         price: 120,
//         location: "Manali, Himachal Pradesh",
//         country: "India"
//     });

//     await sampleListing.save();
//     console.log("sample saved");
// });