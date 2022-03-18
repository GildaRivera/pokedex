const Move = require("../models/moveHaspokemon.model")
// Create and Save a Move
exports.createMove = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      error: "Bad request",
    });
  }
  // Create a Move
  const move = new Move({
    moves_id : req.body.moves_id,
    pokemon_id : req.body.pokemon_id
  });
  // Save Move in the database
  Move.create(move, (err, data) => {
    if (err)
      return res.status(500).send({
        message: err.message || "Some error occurred while creating the Move.",
      });
    else return res.status(200).send(data);
  });
};

// Retrieve all Moves
exports.getAllMoves = (req, res) => {
  Move.getAll((err, data) => {
    if (err)
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Moves",
      });
    else return res.send(data);
  });
};


// Find a single Move with a id
exports.getMove = (req, res) => {
  Move.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          error: `Not found Move for pokemon with id ${req.params.id}.`,
        });
      } else {
        return res.status(500).send({
          error: "Error retrieving Move with id " + req.params.id,
        });
      }
    } else return res.send(data);
  });
};

// Update a Move identified by the id in the request
exports.updateMove = (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0){
    return res.status(400).send({
      error: "Bad request",
    });
  }
  Move.updateById(req.params.id, new Move(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
       return res.status(404).send({
          error: `Not found`,
        });
      } else {
       return res.status(500).send({
          error: "Error updating Move with id " + req.params.id,
        });
      }
    } else return res.send(data);
  });
};
// Delete a Move with the specified id in the request
exports.deleteMove = (req, res) => {
  Move.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
       return res.status(404).send({
          error: `Not found`,
        });
      } else {
        return res.status(500).send({
          error: "Could not delete Move with id " + req.params.id,
        });
      }
    } else return res.send({ message: `Move was deleted successfully` });
  });
};

