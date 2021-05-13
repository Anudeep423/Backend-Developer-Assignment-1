var express = require("express");
var router = express.Router();
const { signup ,signin} = require("../controllers/auth");
const {getAllStudents} = require("../controllers/users")
const {checkStudentSessions} = require("../controllers/session")



router.post("/signup",signup);

router.post( "/signin", signin  );

router.get("/getallstudents",getAllStudents)

router.get("/checkStudentSessions/:name" , checkStudentSessions )


module.exports = router;