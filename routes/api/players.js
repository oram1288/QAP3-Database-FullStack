var router = require("express").Router();
const playersDal = require("../../services/pg.players.dal");

// api/players
router.get("/", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/players/ GET " + req.url);
  try {
    let thePlayers = await playersDal.getPlayers();
    res.json(thePlayers);
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

// api/players/:id
router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/players/:id GET " + req.url);
  try {
    let aPlayer = await playersDal.getPlayerByPlayerId(req.params.id);
    if (aPlayer.length === 0) {
      // log this error to an error log file.
      res.statusCode = 404;
      res.json({ message: "Not Found", status: 404 });
    } else res.json(aPlayer);
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.post("/", async (req, res) => {
  if (DEBUG) {
    console.log("ROUTE: /api/players/ POST");
    // console.log(req);
  }
  try {
    await playersDal.addPlayer(
      req.body.firstName,
      req.body.lastName,
      req.body.teamName
    );
    res.statusCode = 201;
    res.json({ message: "Created", status: 201 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/players PUT " + req.params.id);
  try {
    await playersDal.putPlayer(
      req.params.id,
      req.body.firstName,
      req.body.lastName,
      req.body.teamName
    );
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/players PATCH " + req.params.id);
  try {
    await playersDal.patchPlayer(
      req.params.id,
      req.body.firstName,
      req.body.lastName,
      req.body.teamName
    );
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/players DELETE " + req.params.id);
  try {
    await playersDal.deletePlayer(req.params.id);
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

module.exports = router;
