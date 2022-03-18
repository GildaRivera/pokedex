const sql = require("./connection");
// constructor
const Move= function(move) {
    this.move = move.move
};
Move.create = (newMove, result) => {
  sql.query("INSERT INTO moves SET ?", newMove, (err, res) => {
    if (err) {
      return result(err, null);
    }
    return result(null, { id: res.insertId, ...newMove});
  });
};
Move.findById = (id, result) => {
  sql.query(`SELECT * FROM moves WHERE id = ${id}`, (err, res) => {
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
Move.getAll = (result) => {
  let query = "SELECT * FROM moves";
  sql.query(query, (err, res) => {
    if (err) {
     return result(null, err);
    }
   
   return  result(null, res);
  });
};

Move.updateById = (id, Move, result) => {
  sql.query(
    "UPDATE moves SET move = ?  WHERE id = ?",
    [Move.move, id],
    (err, res) => {
      if (err) {
        return result(null, err);
      }
      if (res.affectedRows == 0) {
        return result({ kind: "not_found" }, null);
      }
      return result(null, { id: id, ...Move });
    }
  );
};
Move.remove = (id, result) => {
  sql.query("DELETE FROM moves WHERE id = ?", id, (err, res) => {
    if (err) {
     return result(null, err);
    }
    if (res.affectedRows == 0) {
     return result({ kind: "not_found" }, null);

    }
    return result(null, res);
  });
};

module.exports = Move;