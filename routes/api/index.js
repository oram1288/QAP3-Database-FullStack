var router = require("express").Router();

if (DEBUG) {
  console.log("ROUTE: /api/players");
}
// http://localhost:3000/api/actors/
const playersRouter = require("./players");
router.use("/players", playersRouter);

module.exports = router;
