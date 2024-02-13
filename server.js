require("dotenv").config();
const express = require('express');
const app = express();
const knex = require("knex")(require("./knexfile"));
const cors = require("cors");
const usersRoutes = require("./routes/usersRoutes.js")
const vocabularyRoutes = require("./routes/vocabularyRoutes.js")
const trainingsRoutes = require("./routes/trainingsRoutes.js")

const PORT = process.env.PORT || 8081;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors());

app.use(cors({ origin: CLIENT_URL }));

app.use("/users", usersRoutes);
app.use("/vocabulary", vocabularyRoutes);
app.use("/trainings", trainingsRoutes);

app.use(express.json());



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});