const express = require('express');
const router = express.Router();
const db = require('../db/models');

router.post('/', async (req, res) => {
    const { username } = req.body;
    const newUser = await db.User.create({ username });

    if (newUser) {
        res.status(200);
        res.json({ newUser });
    }
});

module.exports = router;
