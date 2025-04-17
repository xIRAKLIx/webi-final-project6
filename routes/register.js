const express = require('express');
const router = express.Router();
const fs = require('fs');

const USERS_FILE = 'users.json';

router.get('/', function(req, res, next) {
    res.render('register', { error: null });
});

router.post('/', function(req, res, next) {
    const { email, password, confirmPassword } = req.body;

    console.log(email, password, confirmPassword);

    if (confirmPassword !== password) {
        res.render('register', { error: 'Passwords do not match' });
    }
    const data = fs.readFileSync(USERS_FILE);
    const users = JSON.parse(data);
    users.push({ email, password });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    res.render('register', { error: null });
});

module.exports = router;