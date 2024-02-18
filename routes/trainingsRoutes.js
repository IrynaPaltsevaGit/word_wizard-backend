const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();

const knex = require("knex")(require("../knexfile"));
const authMiddleware = require('../middlewares/authorize.middleware.js');
require("dotenv").config();

app.use(cors());

// getting 10 the word cards for the user
router.get("/", authMiddleware, async (req, res) => {
    try {
     const data = await knex("words")
       .select(
         "words.id",
         "words.word",
         "words.translation",
         "words.progress"
       )
       .join("users", "words.user_id", "users.id")
       .where({ 'users.id': req.userObj.id})
       .orderBy("words.progress", "asc")
       .limit(10);
       
       res.status(200).json(data);
     
   } catch  (error) {
     console.log(error)
     res.status(400).json(error);
     
   }
 });

 module.exports = router;
