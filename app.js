const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Bienvenue sur API de Ela Rebai !");
});

app.get("/status", (req, res) => {
  res.json({ status: "OK", message: "L’API fonctionne correctement !" });
});

app.listen(port, () => {
  console.log(`API démarrée sur http://localhost:${port}`);
});
