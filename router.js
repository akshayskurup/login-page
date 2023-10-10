var express = require("express");
var router = express.Router();
var nocache = require('nocache');

const credential = {
  email: "akshayskurup@gmail.com",
  password: "akshay9744",
  name: "Akshay"
};

router.use(nocache());//change

//login user
router.post("/login",(req,res)=>{
    if(req.body.email != credential.email) {
        res.render('base', { error: 'Invalid Email' });
    }
    else if(req.body.password != credential.password) {
        res.render('base', { error: 'Invalid Password' });
    }
    else {
        req.session.user =true;
        res.redirect('/route/dashboard');
    }
});


//route for dashboard
router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.setHeader('Cache-Control','no-store, no-cache, must-revalidate, private');
    res.render("dashboard", { users: credential.name });
  } else {
    res.render("base",{error:'Unauthorize author'});
  }
});



// route for logout
router.get("/logout", (req, res) => {
  req.session.destroy(function () {
      res.render("base", {logout: "Logout Successfully...!",}); 
  });
});



  

module.exports = router;
