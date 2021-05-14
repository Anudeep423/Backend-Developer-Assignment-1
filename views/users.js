var express = require("express");
var router = express.Router();
const { signup ,signin} = require("../controllers/auth");
const {getAllStudents} = require("../controllers/users")
const {checkStudentSessions} = require("../controllers/session")
const swaggerUI = require("swagger-ui-express")



router.post("/signup",signup);

router.post( "/signin", signin  );

/**
 * @swagger
 * /api/getallstudents:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: student name.
 *                         example: Rob
 *                       email:
 *                         type: string
 *                         description: The student's name.
 *                         example: rob@gmail.com
 */

router.get("/getallstudents",getAllStudents)

router.get("/checkStudentSessions/:name" , checkStudentSessions )


module.exports = router;