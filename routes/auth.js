const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.post("/signup", async (req, res) => {
    
    try{ 
        const {username, password, nickname} = req.body;
        console.log(req.body)
        // Insert the new user into the 'users' table
        const [newUserId] = await knex("users")
            .insert({
                email: username,
                password,
                nickname
            }); 
        // Fetch the newly added user from the database
        const newUser = await knex('users')
            .where('id', newUserId)
            .first();

        // Send the newly added user as a JSON response
        res.status(201).json(newUser);
    }catch(error){
        res.status(400).json(`signup catch, sys.error: ${error}`);
    }
});



router.post("/login", async (req, res) => {
    // get credentials from the req.body
    const {username, password} = req.body;
    console.log(req.body)
    // find the user by username 
    const user = await knex("users")
        .where({ email: username })
        .first();
    
    // invalid login
    if (!user) {
        return res.status(403).send("Combination not found");
    }

    // Validate the password
    const passwordMatching = user.password === password;

    if (!passwordMatching) {
        return res.status(403).send("Combination of username & password not found"); 
    }

    //generating the token
    const token = jwt.sign(
        {
            id: user.id,
            nickname: user.nickname
        },
        process.env.SECRET_KEY
    );


    res.status(200).json({
        access_token: token,
    });
});

module.exports = router;