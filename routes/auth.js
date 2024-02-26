const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.post("/signup", async (req, res) => {
    
    try{ 
        const {username, password, nickname} = req.body;
        const [newUserId] = await knex("users")
            .insert({
                email: username,
                password,
                nickname
            }); 
        const newUser = await knex('users')
            .where('id', newUserId)
            .first();

        res.status(201).json(newUser);
    }catch(error){
        res.status(400).json(`signup catch, sys.error: ${error}`);
    }
});

router.post("/login", async (req, res) => {   
    const {username, password} = req.body;

    const user = await knex("users")
        .where({ email: username })
        .first();

    if (!user) {
        return res.status(403).send("Combination not found");
    }

    const passwordMatching = user.password === password;

    if (!passwordMatching) {
        return res.status(403).send("Combination of username & password not found"); 
    }

    const token = jwt.sign(
        {
            id: user.id,
            nickname: user.nickname
        },
        process.env.SECRET_KEY
    );


    res.status(200).json({
        access_token: token,
        user
    });
});

router.get("/profile",
    (req, res, next) => {
      const { authorization } = req.headers;
  
      if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      const token = authorization.slice("Bearer ".length);  

      jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {        
        if (err) {
          return res.status(401).json({ error: "failed" });
        } else {
          req.payload = payload;
          next();
        }
      });
    },
    (req, res) => {
      res.json(req.payload);
    }
  );

module.exports = router;