require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/usuarios.routes");
const { reportRequest } = require("./middlewares/logger.middleware");
const { handleErrors, handleNotFound } = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(reportRequest);

app.get("/", (_req, res) => {
  res.json({ message: "Soft Jobs API" });
});

app.use(authRoutes);
app.use(userRoutes);

app.use(handleNotFound);
app.use(handleErrors);

module.exports = app;
