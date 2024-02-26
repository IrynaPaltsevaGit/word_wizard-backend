const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();

const knex = require("knex")(require("../knexfile"));
const authMiddleware = require('../middlewares/authorize.middleware.js');
require("dotenv").config();

app.use(cors());

// getting 10 word cards for the user
router.get("/", authMiddleware, async (req, res) => {
    const limit = req.query.limit ?? 10;   
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
       .limit(limit);
       
       res.status(200).json(data);
     
   } catch  (error) {
     console.log(error)
     res.status(400).json(error);
     
   }
 });

 //updating progress after training done
 router.put("/progress", authMiddleware, async (req, res) => {
  const wordsData = req.body;  

    try {
      const result = await knex.transaction(async trx => {
        const queries = wordsData.map(async word => {
          return knex("words")
            .where({ id: word.id })
            .update({progress: word.progress})
            .transacting(trx);
        });

        return Promise.all(queries)
          .then(trx.commit)    
          .catch(trx.rollback);
      });

      if(result.length == wordsData.length && !result.includes(0)) {
        res.status(201).send({success: true});
      }else {
        res.status(400).send("Failed to update words progress");
      }     
    } catch (error) {
      res.status(400).send({ error: "Failed to update words progress.", sysError: error });
    } 
});

 module.exports = router;
