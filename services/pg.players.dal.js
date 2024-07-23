const dal = require("./QAP3_db");

// Get all players.
var getPlayers = function () {
  if (DEBUG) console.log("players.pg.dal.getPlayers()");
  return new Promise(function (resolve, reject) {
    const sql =
      "SELECT player_id AS _id, first_name, last_name, team_name FROM player \
        ORDER BY player_id DESC LIMIT 7;";
    dal.query(sql, [], (err, result) => {
      if (err) {
        // logging should go here
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var getPlayerByPlayerId = function (id) {
  if (DEBUG) console.log("players.pg.dal.getPlayerByPlayerId()");
  return new Promise(function (resolve, reject) {
    const sql =
      "SELECT player_id AS _id, first_name, last_name, team_name FROM player WHERE player_id = $1";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        // logging should go here
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var addPlayer = function (fname, lname, tname) {
  if (DEBUG) console.log("players.pg.dal.addPlayer()");
  return new Promise(function (resolve, reject) {
    const sql =
      "INSERT INTO public.player(first_name, last_name, team_name) \
        VALUES ($1, $2, $3);";
    dal.query(sql, [fname, lname, tname], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};
var putPlayer = function (id, fname, lname, tname) {
  if (DEBUG) console.log("players.pg.dal.putPlayer()");
  return new Promise(function (resolve, reject) {
    const sql =
      "UPDATE public.player SET first_name=$2, last_name=$3, last_name=$4 WHERE player_id=$1;";
    dal.query(sql, [id, fname, lname, tname], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};
var patchPlayer = function (id, fname, lname, tname) {
  if (DEBUG) console.log("players.pg.dal.patchPlayer()");
  return new Promise(function (resolve, reject) {
    const sql =
      "UPDATE public.player SET first_name=$2, last_name=$3, last_name=$4 WHERE player_id=$1;";
    dal.query(sql, [id, fname, lname, tname], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};
var deletePlayer = function (id) {
  if (DEBUG) console.log("players.pg.dal.deletePlayer()");
  return new Promise(function (resolve, reject) {
    const sql = "DELETE FROM public.player WHERE player_id = $1;";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getPlayers,
  getPlayerByPlayerId,
  addPlayer,
  putPlayer,
  patchPlayer,
  deletePlayer,
};
