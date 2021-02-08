// build your `/api/tasks` router here
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "tasks up and running" })
})

module.exports = router;