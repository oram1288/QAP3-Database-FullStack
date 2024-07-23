const express = require("express");
const router = express.Router();
const playersDal = require("../services/pg.players.dal");

// https://localhost:3000/players/
router.get("/", async (req, res) => {
  try {
    let thePlayers = await playersDal.getPlayers();
    if (DEBUG) console.table(thePlayers);
    res.render("players", { thePlayers });
  } catch {
    res.render("503");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const aPlayer = await playersDal.getPlayerByPlayerId(req.params.id); // from postgresql
    if (DEBUG) console.log(`players.router.get/:id ${aPlayer}`);
    if (aPlayer) res.render("player", { aPlayer });
    else res.render("norecord");
  } catch {
    res.render("503");
  }
});

router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("player.Replace : " + req.params.id);
  res.render("playerPut.ejs", {
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    teamName: req.query.teamName,
    theId: req.params.id,
  });
});

// https://localhost:3000/players/205/edit
router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("player.Edit : " + req.params.id);
  res.render("playerPatch.ejs", {
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    teamName: req.query.teamName,
    theId: req.params.id,
  });
});

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("player.Delete : " + req.params.id);
  res.render("playerDelete.ejs", {
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    teamName: req.query.teamName,
    theId: req.params.id,
  });
});

router.post("/", async (req, res) => {
  if (DEBUG) console.log("players.POST");
  try {
    await playersDal.addPlayer(
      req.body.firstName,
      req.body.lastName,
      req.body.teamName
    );
    res.redirect("/players/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

// PUT, PATCH, and DELETE are part of HTTP, not a part of HTML
// Therefore, <form method="PUT" ...> doesn't work, but it does work for RESTful API

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("players.PUT: " + req.params.id);
  try {
    await playersDal.putPlayer(
      req.params.id,
      req.body.firstName,
      req.body.lastName,
      req.body.teamName
    );
    res.redirect("/players/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});
router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("players.PATCH: " + req.params.id);
  try {
    await playersDal.patchPlayer(
      req.params.id,
      req.body.firstName,
      req.body.lastName,
      req.body.teamName
    );
    res.redirect("/players/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});
router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("players.DELETE: " + req.params.id);
  try {
    await playersDal.deletePlayer(req.params.id);
    res.redirect("/players/");
  } catch (err) {
    if (DEBUG) console.error(err);
    // log this error to an error log file.
    res.render("503");
  }
});

module.exports = router;
