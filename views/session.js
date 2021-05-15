const express = require("express");

const router = express.Router();

const {createSession,getSessionById,updateSessionDetails,getAllSessions,deleteSession,getASession
    ,getAllSessionsOfInstructor} = require("../controllers/session")

const {getUserById} = require("../controllers/users")

const {checkAccess} = require("../controllers/auth")

// middlewares

router.param("userId" , getUserById  )

router.param("sessionId" , getSessionById  )

//route to create a session

/**
*   @swagger
*    components:
*      schemas:
*        CreateSession:
*          type: object
*          required:
*            - instructor
*            - topic
*            - date
*            - startTime
*            - duration  
*          properties:
*            instructor:
*              type: string
*              description: Enter instructor name
*            topic:
*              type: string
*              description: Enter topic to be discussed in the session.
*            date:
*              type: string
*              description: Enter date of the session
*            startTime:
*              type: string
*              description: Enter start time of the session.
*            duration:
*              type: string
*              description: Enter time duration of the session
*            studentsAttending:
*              type: array
*              description: Add all the student name to regsiter them for the session.
*          example:
*             instructor : Pramod
*             topic : maths
*             date  : 14/05/1999
*             startTime : "6:30"
*             studentsAttending : ["Bala,Rakesh"]
*             duration : 1Hr
*               
*/


/**
 * @swagger
 * /api/create/session/{userId}:
 *   post:
 *     summary: This is a procted router you can create a session only by passing instructor id.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Enter Instructor ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSession'
 *     responses:
 *        "200":
*          description: Successfully created session.
*          content:
*             application/json:
*              schema:
*                 $ref: '#/components/schemas/CreateSession'
*/    

router.post("/create/session/:userId" , checkAccess ,  createSession );


// route to get a session 




/**
 * @swagger
 * /api/getasession/{userId}/{sessionId}:
 *   get:
 *     summary: This is a protected route where you can get details of a session it can only be  accesed by the instructor by providing his Id.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric userId of the user to retrieve.
 *         schema:
 *           type: string
 *       - in: path
 *         name: sessionId
 *         required: true
 *         description: Numeric sessionId .
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of students.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     type: object
 * 
 */








router.get("/getasession/:userId/:sessionId",checkAccess, getASession);








// route to update a session

/**
*   @swagger
*    components:
*      schemas:
*        UpdateSession:
*          type: object
*          required:
*            - instructor
*            - topic
*            - date
*            - startTime
*            - duration  
*          properties:
*            instructor:
*              type: string
*              description: Enter instructor name
*            topic:
*              type: string
*              description: Enter topic to be discussed in the session.
*            date:
*              type: string
*              description: Enter date of the session
*            startTime:
*              type: string
*              description: Enter start time of the session.
*            duration:
*              type: string
*              description: Enter time duration of the session
*            studentsAttending:
*              type: array
*              description: Add all the student name to regsiter them for the session.
*          example:
*             instructor : Pramod
*             topic : maths
*             date  : 14/05/1999
*             startTime : "6:30"
*             studentsAttending : ["Bala,Rakesh"]
*             duration : 1Hr
*               
*/


/**
 * @swagger
 * /api/update/session/{userId}/{sessionId}:
 *   put:
 *     summary: This is a procted router you can update a session only by passing instructor id.
 *     parameters:
 *       - in: path
 *         name: userId 
 *         required: true
 *         description: Enter Instructor ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: sessionId 
 *         required: true
 *         description: Enter Session ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSession'
 *     responses:
 *        "200":
*          description: Successfully created session.
*          content:
*             application/json:
*              schema:
*                 $ref: '#/components/schemas/UpdateSession'
*/    






router.put("/update/session/:userId/:sessionId" , checkAccess , updateSessionDetails);

// route to get all sessions



/**
 * @swagger
 * /api/getallsessions/{userId}:
 *   get:
 *     summary: This is a protected route where you get details of all the sessions
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric userId of the user to retrieve.
 *         schema:
 *           type: string
  *     responses:
 *       200:
 *         description: A list of students.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     type: object
 *                     properties:
 *                       role:
 *                         type: integer
 *                         description: user's role 1 if instructor and 0 if student.
 *                         example: 0
 *                       _id:
 *                         type: string
 *                         description: Id generated by mongoDB.
 *                         example: 609ec4b3aa111c1d3c1a016b
 *                       name:
 *                         type: string
 *                         description: user name.
 *                         example: bob
 *                       salt:
 *                         type: string
 *                         description: Secret for Security.
 *                         example: b73fd738-f22e-4d63-85f6-24259a56af76
 *                       encry_password:
 *                         type: string
 *                         description: Encrypted password.
 *                         example: e0d40a51514e20a68f14c42b4620a480ae4b6bf760c2fc026fcbfddde104a9a4
 *                       email:
 *                         type: string
 *                         description: The student's name.
 *                         example: rob@gmail.com
 *                       createdAt:
 *                         type: string                      
 *                         example: 2021-05-13T18:24:42.198Z
 *                       updatedAt:
 *                         type: string                      
 *                         example: 2021-05-14T16:22:21.198Z
 */






router.get("/getallsessions/:userId",checkAccess,getAllSessions)

// route to delete a session 



/**
 * @swagger
 * /api/delete/session/{userId}/{sessionId}:
 *   delete:
 *     summary: This is a protected route where you can delete a session .
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric userId of the user to retrieve.
 *         schema:
 *           type: string
 *       - in: path
 *         name: sessionId 
 *         required: true
 *         description: Enter Session ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deletion Successfull.

 */


router.delete("/delete/session/:userId/:sessionId",checkAccess,deleteSession)


// router to get all sessions of an instructor by passing his id and name


/**
 * @swagger
 * /api/getallsessionsofinstructor/{userId}/{name}:
 *   get:
 *     summary: This is a protected route where you can all the sessions of an instructor .
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric userId of the user to retrieve.
 *         schema:
 *           type: string
 *       - in: path
 *         name: name 
 *         required: true
 *         description: Enter name of Instructor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deletion Successfull.

 */




router.get("/getallsessionsofinstructor/:userId/:name", checkAccess ,getAllSessionsOfInstructor   )



module.exports = router;