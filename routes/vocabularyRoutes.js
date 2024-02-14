const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const authMiddleware = require('../middlewares/authorize.middleware.js');
const knex = require("knex")(require("../knexfile"));
require("dotenv").config();

app.use(cors());

// getting all the word cards for the user
router.get("/", authMiddleware, async (req, res) => {
     try {
      const data = await knex("words")
        .select(
          "words.id",
          "words.word",
          "words.translation",
          "words.progress",
          "words.notes"
        )
        .join("users", "words.user_id", "users.id")
        .where({ 'users.id': req.userObj.id});
        
        res.status(200).json(data);
      
    } catch  (error) {
      console.log(error)
      res.status(400).json(error);
      
    }
  });

// POST route to create a new word card
router.post("/new", async (req, res) => {
    const { user_id, word, translation, notes } = req.body;  
    if (
        !word ||
      !translation
    ) {
      return res
        .status(400)
        .json({ error: "Some fields are empty" });
    }    
    try {
      const [newWordId] = await knex("words").insert({
        user_id: req.userObj.id,
        word,
        translation,
        notes
      })
      //.join("users", "words.user_id", "=", req.userObj.id);;

      console.log(newWordId);

      const newWord = await knex("words")
         .where("id", newWordId)
         .first();
  
      res.status(201).send(newWord);
    } catch (error) {
      res.status(400).send({ error: "Failed to create a new word card." });
    }
  });

  module.exports = router;