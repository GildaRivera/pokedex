const Pokemon = require("../models/pokemon.model")
// Create and Save a Pokemon
exports.createPokemon = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      error: "Bad request",
    });
  }
  // Create a pokemon
  const pokemon = new Pokemon({
    name: req.body.name,
    nickname: req.body.nickname,
    gender: req.body.gender,
    user_id:req.body.user_id,
    pokemonId:req.body.pokemonId,
    url:req.body.url
  });
  // Save pokemon in the database
  Pokemon.create(pokemon, (err, data) => {
    if (err)
      return res.status(500).send({
        message: err.message || "Some error occurred while creating the Pokemon.",
      });
    else return res.status(200).send(data);
  });
};

// Retrieve all Pokemons
exports.getAllPokemons = (req, res) => {
  Pokemon.getAll((err, data) => {
    if (err)
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Pokemons",
      });
    else return res.send(data);
  });
};


// Find a single Pokemon with a id
exports.getPokemon = (req, res) => {
  Pokemon.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          error: `Not found Pokemon with id ${req.params.id}.`,
        });
      } else {
        return res.status(500).send({
          error: "Error retrieving Pokemon with id " + req.params.id,
        });
      }
    } else return res.send(data);
  });
};

// Update a Pokemon identified by the id in the request
exports.updatePokemon = (req, res) => {
  // Validate Request
  if (Object.keys(req.body).length === 0){
    return res.status(400).send({
      error: "Bad request",
    });
  }
  Pokemon.updateById(req.params.id, new Pokemon(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
       return res.status(404).send({
          error: `Not found`,
        });
      } else {
       return res.status(500).send({
          error: "Error updating Pokemon with id " + req.params.id,
        });
      }
    } else return res.send(data);
  });
};
// Delete a Pokemon with the specified id in the request
exports.deletePokemon = (req, res) => {
  Pokemon.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
       return res.status(404).send({
          error: `Not found`,
        });
      } else {
        return res.status(500).send({
          error: "Could not delete Pokemon with id " + req.params.id,
        });
      }
    } else return res.send({ message: `Pokemon was deleted successfully` });
  });
};

// user pokemon
exports.userPokemon = (req, res) => {
  Pokemon.getUser(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          error: `Not found pokemon for email${req.params.id}.`,
        });
      } else {
        return res.status(500).send({
          error: "Error retrieving pokemon for email " + req.params.id,
        });
      }
    } else if(data.length==0){
      return res.status(404).send({
        error: `Not found user email${req.params.id}.`,
      });
    }
    
    return res.send(data);
  });
};