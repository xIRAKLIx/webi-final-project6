const express = require('express');
const fs = require("fs");
const router = express.Router();

router.get('/', (req, res) => {
    const email = req.session.email || null;
    res.render('about', { email });
});



module.exports = router;