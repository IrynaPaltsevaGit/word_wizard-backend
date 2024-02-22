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
    const {limit, page} = req.query;
    const offset = page * limit - limit;
    console.log(offset)

    try {
      const words = await knex("words")
        .select(
          "words.id",
          "words.word",
          "words.translation",
          "words.progress",
          "words.notes",
          "words.created_at"
        )
        .join("users", "words.user_id", "users.id")
        .where({ 'users.id': req.userObj.id})
        .orderBy(["words.progress", "words.created_at"], "asc")
        .limit(limit)
        .offset(offset);
      
      // get total words amount
      const response = await knex("words")
        .join("users", "words.user_id", "users.id")
        .where({ 'users.id': req.userObj.id })
        .count();
        
        res.status(200).json({words, wordsAmount: response[0]['count(*)']});
      
    } catch  (error) {
      console.log(error)
      res.status(400).json(error);
      
    }
});

// POST route to create a new word card
router.post("/new", authMiddleware, async (req, res) => {
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
      console.log(req.userObj)
      const [newWordId] = await knex("words").insert({
        user_id: req.userObj.id,
        word: word.toLowerCase(),
        translation: translation.toLowerCase(),
        notes
      })
      //.join("users", "words.user_id", "=", req.userObj.id);;

      console.log(newWordId);

      const newWord = await knex("words")
         .where("id", newWordId)
         .first();
  
      res.status(201).send(newWord);
    } catch (error) {
      res.status(400).send({ error: "Failed to create a new word card. ", sysError: error });
    }
  });


  // DELETE wordcard from vocabulary
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const word = await knex("words").where("id", id).del();
    if (!word) {
      return res.status(404).send({ error: "Wordcard not found" });
    }      
    res.status(204).send('success');
  } catch (error) {
    console.error({error: "Failed to delete wordcard"});
    res.status(400).send({ error: "Failed to delete wordcard", details: error.message });
  }
});

  module.exports = router;