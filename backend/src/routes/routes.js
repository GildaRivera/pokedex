module.exports = routes => {
    const user= require("../controllers/user.controller");
    const pokemon = require("../controllers/pokemon.controller")
    var router = require("express").Router();
    // USER
    // Create a new user
    router.post("/user", user.createUser);
    // Retrieve all user
    router.get("/user", user.getAllUsers);
    // Retrieve a single user with id
    router.get("/user/:id", user.getUser);
    // Update a user with id
    router.put("/user/:id", user.updateUser);
    // Delete a user with id
    router.delete("/user/:id", user.deleteUser);

    // POKEMON
    // Create a new pokemon
    router.post("/pokemon", pokemon.createPokemon);
    // Retrieve all user
    router.get("/pokemon", pokemon.getAllPokemons);
    // Retrieve a single user with id
    router.get("/pokemon/:id", pokemon.getPokemon);
    // Update a user with id
    router.put("/pokemon/:id", pokemon.updatePokemon);
    // Delete a user with id
    router.delete("/pokemon/:id", pokemon.deletePokemon);



    routes.use('/api', router);
  };