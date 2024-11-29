const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes");
const mongoConnect = require("./db");

const app = express();

const PORT = process.env.PORT;

app.use(cors({ exposedHeaders: "Authorization" }));
app.use(express.json());

app.use("/api/v1", mainRouter);

mongoConnect().then(() => {
  ("Mongo db connected");
  app.listen(PORT, () => {
    "Server is listening to port " + PORT;
  });
});
