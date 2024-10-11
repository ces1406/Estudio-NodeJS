import express from "express";

export const rutas = express.Router();

rutas.get("/", (req, res) => {
  console.log("\x1b[35m%s\x1b[0m", '----------------------------------------------')
  console.log("Router->rutas");
  res.send("ROUTER-RUTAS");
});
