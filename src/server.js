const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const apiRouter = require("./routers/app.routers");
const errorHandler = require("./middleware/error.middleware");
const DB_CONFIG = require("./config/db.config");
const ENV_CONFIG = require("./config/env.config");
const logger = require("./logger");
const cors = require("cors");
const path = require("path");
const hanblebars = require("express-handlebars");

const app = express();

app.engine("handlebars", hanblebars.engine());
app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "handlebars");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api", apiRouter);

app.use(errorHandler);

const { PORT } = ENV_CONFIG;

mongoose
  .connect(DB_CONFIG.mongo.uri)
  .then(() => {
    logger.info("Connected to DB successfully!");
    const server = app.listen(+PORT, () => {
      const serverURI = `http://localhost:${+PORT}`;
      logger.info(`Server is up and running on ${serverURI}`);
    });
    server.on("error", (error) => {
      const serverURI = `http://localhost:${+PORT}`;
      logger.error(
        `There was an error trying to start the server on ${serverURI}`
      );
      throw error;
    });
  })
  .catch((error) => {
    logger.error(
      `There was an error trying to connect to ${DB_CONFIG.mongo.uri}`
    );
    throw error;
  });
