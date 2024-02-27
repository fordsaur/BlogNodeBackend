var express = require('express');
var router = express.Router();
const userModel= require('../Models/users');
const bcrypt = require('bcrypt');




// function checkEmail(req,res,next){
//   var email=req.body.Email;
//   var checkexitemail=userModel.findOne({email:email});
//   checkexitemail.exec((err,data)=>{
//  if(err) throw err;
//  if(data){
//   return res.status(200).json({
//     msg:"Email Already Exits",
//     results:data
// });
//  }
//  next();
//   });
// }


/* GET users listing. */
router.get('/', function(req, res, next) {
  const userSchema = new userModel({
    name: "saurabh",
    email: "saurabhkolarkar122@gmail.com",
    password:"pass@123",
  });
 userSchema.save().then(savedDoc => {
  res.send('respond with a resource');
});
});




router.post('/register',function(req, res, next) {
 
  bcrypt.hash(req.body.Password, 10, function(err, hash) {
 
    if(err){
      res.status(400).json({
            msg:"Something Wrong, Try Later!",
            results:err
        });
    }else{
  var userDetails = new userModel({
    name: req.body.Name,
    email: req.body.Email,
    password: hash,
    role:"Author",
    
  });
 
  userDetails.save().then(resResult=>{
    res.status(201).json({
        msg:"Inserted Successfully",
        results:resResult
    });


})
.catch(err=>{
    res.json(err);
});
}
});
});



router.post("/login",function(req,res,next){

  var email=req.body.Email;
  userModel.find({email:email})
  .exec()
  .then(user=>{
      if(user.length<1){
          res.status(200).json({
            msg:"Auth Failed",
            UserData:'',
            status:'error'
          });
      }else{
          bcrypt.compare(req.body.Password, user[0].password, function(err, result) {
             if(err){
              res.json({
                msg:"Auth Failed",
                UserData:'',
                status:'error'
              });
             }
             if(result){
              res.status(200).json({
                msg:"User Login Successfully",
                  UserData:user,
                  status:'success'
              });
             }else{
              res.json({
                msg:"Auth Failed",
                UserData:'',
                status:'error'
              });
             }
          });
      
  }
  })
  .catch(err=>{
      res.json({
          error:err
      });
  })


  });


module.exports = router;
