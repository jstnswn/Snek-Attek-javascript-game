const express = require('express');
const router = express.Router();
const db = require('../db/models');

router.get('/', async (req, res) => {
    const scores = await db.Score.findAll({
        include: [db.User],
        order: [
            ['score', 'DESC']
        ],
        limit: 3
    });

    if (scores) {
        res.status(200);
        res.json({ scores });
    } else console.error('failed to fetch scores');
});

router.post('/', async (req, res) => {
    const { score } = req.body;
    const newScore = db.Score.create({ score, userId: 1 });

    if (newScore) {
        res.status(200);
        res.json({ newScore} );
    }
});

module.exports = router;
