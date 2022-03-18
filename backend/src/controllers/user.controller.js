const User = require("../models/user.model");
// Create and Save a user
exports.createUser = (req, res) => {
  // Validate request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      error: "Bad request",
    });
  }
  // Create a user
  const user = new User({
    name: req.body.name,
    nickname: req.body.nickname,
    region: req.body.region,
    gender: req.body.gender,
    age: req.body.age,
    trainerclass: req.body.trainerclass,
    email: req.body.email,
  });
  // Save user in the database
  User.create(user, (err, data) => {
    if (err)
      return res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else return res.status(200).send(data);
  });
};
// Retrieve all users
exports.getAllUsers = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users",
      });
    else return res.send(data);
  });
};


// Find a single user with a id
exports.getUser = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          error: `Not found user with id ${req.params.id}.`,
        });
      } else {
        return res.status(500).send({
          error: "Error retrieving user with id " + req.params.id,
        });
      }
    } else return res.send(data);
  });
};

// Update a user identified by the id in the request
exports.updateUser = (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0){
    return res.status(400).send({
      error: "Bad request",
    });
  }
  User.updateById(req.params.id, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
       return res.status(404).send({
          error: `Not found`,
        });
      } else {
       return res.status(500).send({
          error: "Error updating user with id " + req.params.id,
        });
      }
    } else return res.send(data);
  });
};
// Delete a user with the specified id in the request
exports.deleteUser = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
       return res.status(404).send({
          error: `Not found`,
        });
      } else {
        return res.status(500).send({
          error: "Could not delete user with id " + req.params.id,
        });
      }
    } else return res.send({ message: `User was deleted successfully` });
  });
};
