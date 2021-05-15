const userSchema = require("../models/users");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

  exports.getAllUsers = (req,res) => {
    userSchema.find()
    .select("-_id -salt -encry_password -updatedAt -createdAt -__v ")
    .exec( (err , users) => {
        if(err || !users){
            return res.json(err)
        }
       
         return res.json(users)   

    } )

  }

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
        { $project : { role : 0 , salt : 0 , encry_password : 0 , createdAt : 0 ,updatedAt : 0 , __v : 0   }  }
    ]).
        exec((err, students) => {
            res.json(students   )
        })

}

exports.getAUser = (req,res) => {
return   res.json(req.user)
}



  
  
  
