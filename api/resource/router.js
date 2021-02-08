// build your `/api/resources` router here
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "resources up and running" })
})

module.exports = router;