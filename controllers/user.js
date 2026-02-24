const user = require("../model/user.js");

module.exports.renderSignUpForm = (req,res)=>{
    res.render("./users/signUp.ejs");
}
module.exports.renderLoginForm = (req,res)=>{
    res.render("./users/login.ejs");
}

module.exports.createUser = async(req,res,err)=>{
    try{
        let{username,email,password}=req.body;
        const newUser = new user({email,username});
        let regUser=await user.register(newUser,password);
        console.log(regUser);
        req.login(regUser,(err)=>{
                if(err){
                    return next(err);
                }
                req.flash("success","registartion successfull");
                res.redirect("/listings");
            })
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.loginUser = async (req, res) => {
    req.flash("success", "Welcome to Wanderlust! You are logged in.");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }

module.exports.logOutUser = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    });
}