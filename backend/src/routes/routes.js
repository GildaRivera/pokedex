module.exports = routes => {
    const user= require("../controllers/user.controller");
    const pokemon = require("../controllers/pokemon.controller")
    const move = require("../controllers/move.controller")
    const movehaspokemon = require("../controllers/moveHaspokemon.controller")
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
    // Login user
    router.post("/login", user.loginUser);

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
    //Get pokemon for user
    router.get("/pokemon/user/:id", pokemon.userPokemon);

  // MOVE
    // Create a new move
    router.post("/move", move.createMove);
    // Retrieve all moves
    router.get("/move", move.getAllMoves);
    // Retrieve a single move with id
    router.get("/move/:id", move.getMove);
    // Update a move with id
    router.put("/move/:id", move.updateMove);
    // Delete a move with id
    router.delete("/move/:id", move.deleteMove);


  // MOVE HAS POKEMON
    // Assign new move fo
    router.post("/move-pokemon", movehaspokemon.createMove);
    // Retrieve all assign moves
    router.get("/move-pokemon", movehaspokemon.getAllMoves);
    // Retrieve a single assign move with id
    router.get("/move-pokemon/:id", movehaspokemon.getMove);
    // Update assign move with id
    router.put("/move-pokemon/:id", movehaspokemon.updateMove);
    // Delete a assign move with id
    router.delete("/move-pokemon/:id", movehaspokemon.deleteMove);



    routes.use('/api', router);
  };