const sessionSchema = require("../models/session")
const userSchema = require("../models/users");

exports.getSessionById = (req, res, next, id) => {
  console.log('Called', id)
  sessionSchema.findOne({ _id: id })
    .exec((err, session) => {
      if (err || !session) {
        return res.json(err)
      }
      req.session = session
      next();
    })
}

exports.getASession = (req, res) => {

  return res.json(req.session);

}


exports.createSession = (req, res) => {

  const session = new sessionSchema(req.body)

  session.save((err, session) => {
    if (err) {
      return res.json({
        error: err
      })
    }
    return res.json(session);
  })


}

exports.getAllSessions = (req, res) => {
  sessionSchema.find()
    .exec((err, sessions) => {
      if (err || !sessions) {
        return res.json(err)
      }
      return res.json(sessions)
    })
}



exports.updateSessionDetails = (req, res) => {
  console.log("updateSessionDetails", req.session)
  sessionSchema.findByIdAndUpdate(
    { _id: req.session._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, session) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json(session);
    }
  );
};

exports.deleteSession = (req, res) => {
  const session = req.session;

  session.remove((err, session) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this session"
      });
    }
    res.json({
      message: "Successfully deleted"
    });
  });
}


exports.checkStudentSessions = (req, res) => {

  sessionSchema.aggregate([
    { $match: { "studentsAttending": req.params.name } }
  ]).exec((err, sessions) => {
    if (err || !sessions) {
      return res.json(err)
    }
    return res.json(sessions)
  })


}

exports.getAllSessionsOfInstructor = async (req, res) => {

  await sessionSchema.aggregate([
    { $match: { "instructor": req.params.name } }
  ]).exec((err, sessions) => {
    if (err) {
      return res.json(err)
    }
    return res.json(sessions)
  })


}
