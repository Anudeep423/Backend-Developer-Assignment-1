const express = require("express");

const router = express.Router();

const {createSession,getSessionById,updateSessionDetails,getAllSessions,deleteSession} = require("../controllers/session")

const {getUserById} = require("../controllers/users")

const {checkAccess} = require("../controllers/auth")

// middlewares

router.param("userId" , getUserById  )

router.param("sessionId" , getSessionById  )

//route to create a session

router.post("/create/session/:userId" , checkAccess ,  createSession );

// route to update a session

router.put("/update/session/:userId/:sessionId" , checkAccess , updateSessionDetails);

// route to get all sessions

router.get("/getallsessions/:userId",checkAccess,getAllSessions)

// route to delete a session 

router.delete("/delete/session/:userId/:sessionId",checkAccess,deleteSession)




module.exports = router;