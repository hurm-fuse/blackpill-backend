const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("hey it's a router for blog page");
    res.send('Hello World from router for blog page!')
})

router.get('/:slug', (req, res) => {
    res.send(req.params.slug)
})

module.exports = router;