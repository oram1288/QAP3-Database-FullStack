const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // Important!
app.use(methodOverride("_method")); // This too!

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Auston Mattthews" });
});
app.get("/about", (request, response) => {
  response.render("about.ejs");
});

const playersRouter = require("./routes/players");
app.use("/players", playersRouter);

// anything beginning with "/api" will go into this
const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Player app running on port ${PORT}.`);
});
