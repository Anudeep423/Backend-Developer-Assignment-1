const userSchema = require("../models/users");
var jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
    const user = new userSchema(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          error : err
        });
      }
      res.json({
       user
      });
    });
  };

  exports.signin = (req, res) => {

    const {email,password} = req.body

    userSchema.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "USER email does not exists"
        });
      }
  
      if (!user.autheticate(password)) {
        return res.status(401).json({
          error: "Email and password do not match"
        });
      }
  
      //create token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET  );
      //put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });
  
      //send response to front end
      const { _id, name, email, role } = user;
      return res.json({ token, user: { _id, name, email, role } });
    });
  };

exports.checkAccess = (req,res,next) => {
    console.log("CALLED IN CHECK ACCESS")
    console.log(req.user)

    if(req.user.role === 1 ){
        next();
    }else{
        return res.json("You dont have permission to perform this operation")
    }
}