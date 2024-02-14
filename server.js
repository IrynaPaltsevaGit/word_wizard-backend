require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const usersRoutes = require("./routes/usersRoutes.js")
const vocabularyRoutes = require("./routes/vocabularyRoutes.js")
const trainingsRoutes = require("./routes/trainingsRoutes.js")

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

// app.use("/users", usersRoutes);
app.use("/vocabulary", vocabularyRoutes);
// app.use("/trainings", trainingsRoutes);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});