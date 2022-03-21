const sql = require("./connection");
const http = require("http");
// constructor
const User = function(user) {
    this.name = user.name
    this.nickname=user.nickname
    this.region=user.region
    this.gender=user.gender
    this.age=user.age
    this.trainerclass=user.trainerclass
    this.email=user.email

};
User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log(err,"......")
      return result(err, null);
    }
    return result(null, { id: res.insertId, ...newUser});
  });
};
User.findById = (id, result) => {
  sql.query(`SELECT * FROM user WHERE id = ${id}`, (err, res) => {
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
User.getAll = (result) => {
  let query = "SELECT * FROM user";
  sql.query(query, (err, res) => {
    if (err) {
     return result(null, err);
    }
   
   return  result(null, res);
  });
};
User.login = (email, result) => {
  sql.query("SELECT * FROM user WHERE email = ?",[email] , (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};
User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE user SET name = ?, nickname = ?, region = ?, gender = ?, age = ?, trainerclass = ?, email = ? WHERE id = ?",
    [user.name, user.nickname, user.region, user.gender, user.age, user.trainerclass, user.email, id],
    (err, res) => {
      if (err) {
        return result(null, err);
      }
      if (res.affectedRows == 0) {
        return result({ kind: "not_found" }, null);
      }
      return result(null, { id: id, ...user });
    }
  );
};
User.remove = (id, result) => {
  sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
    if (err) {
     return result(null, err);
    }
    if (res.affectedRows == 0) {
     return result({ kind: "not_found" }, null);

    }
    return result(null, res);
  });
};

module.exports = User;