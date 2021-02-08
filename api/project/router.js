// build your `/api/projects` router here
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "projects up and running" })
})

module.exports = router;