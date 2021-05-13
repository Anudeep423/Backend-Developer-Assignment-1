const userSchema = require("../models/users");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

  exports.getUserById = (req,res,next,id) => {

    userSchema.findOne({_id : id  })
    .exec( (err,user) => {
        if(err || !user){
            return res.json(err)
        }
        req.user = user
        next();
    }   )
}


exports.getAllStudents = (req,res) => {
    userSchema.aggregate([
        { $match: { role : 0   } },
    ]).
        exec((err, students) => {
            res.json(students   )
        })

}


  
  
  
