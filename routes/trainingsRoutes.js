const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();

app.use(cors());
require("dotenv").config();
const knex = require("knex")(require("../knexfile"));
module.exports = router;