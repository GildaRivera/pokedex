const sql = require("./connection");
// constructor
const Pokemon= function(pokemon) {
    this.name = pokemon.name
    this.nickname=pokemon.nickname
    this.gender=pokemon.gender
    this.user_id=pokemon.user_id
    this.pokemonId=pokemon.pokemonId

};
Pokemon.create = (newPokemon, result) => {
  sql.query("INSERT INTO pokemon SET ?", newPokemon, (err, res) => {
    if (err) {
      return result(err, null);
    }
    return result(null, { id: res.insertId, ...newPokemon});
  });
};
Pokemon.findById = (id, result) => {
  sql.query(`SELECT * FROM pokemon WHERE id = ${id}`, (err, res) => {
    if (err) {
      return result(err, null);
    }
    if (res.length) {
      return result(null, res[0]);
    }
    // not found User with the id
 
    result({ kind: "not_found" }, null);
  });
};
Pokemon.getAll = (result) => {
  let query = "SELECT * FROM pokemon";
  sql.query(query, (err, res) => {
    if (err) {
     return result(null, err);
    }
   
   return  result(null, res);
  });
};

Pokemon.updateById = (id, pokemon, result) => {
  sql.query(
    "UPDATE pokemon SET name = ?, nickname = ?, gender = ?, user_id = ?, pokemonId = ? WHERE id = ?",
    [pokemon.name, pokemon.nickname, pokemon.gender, pokemon.user_id, pokemon.pokemonId, id],
    (err, res) => {
      if (err) {
        return result(null, err);
      }
      if (res.affectedRows == 0) {
        return result({ kind: "not_found" }, null);
      }
      return result(null, { id: id, ...pokemon });
    }
  );
};
Pokemon.remove = (id, result) => {
  sql.query("DELETE FROM pokemon WHERE id = ?", id, (err, res) => {
    if (err) {
     return result(null, err);
    }
    if (res.affectedRows == 0) {
     return result({ kind: "not_found" }, null);

    }
    return result(null, res);
  });
};

module.exports = Pokemon;