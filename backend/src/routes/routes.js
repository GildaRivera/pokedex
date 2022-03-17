module.exports = routes => {
    const user= require("../controllers/user.controller");
    const pokemon = require("../controllers/pokemon.controller")
    var router = require("express").Router();
    // Create a new user
    router.post("/", user.createUser);
    // Retrieve all user
    router.get("/", user.getAllUsers);
    // Retrieve a single user with id
    router.get("/:id", user.getUser);
    // Update a user with id
    router.put("/:id", user.updateUser);
    // Delete a user with id
    router.delete("/:id", user.deleteUser);
    routes.use('/api/user', router);
  };