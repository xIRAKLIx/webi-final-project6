const express = require('express');
const router = express.Router();
const fs = require('fs');

const BLOGS_FILE = 'blogs.json';

const requireAuth = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/login');
    }
}

router.get('/', requireAuth, function(req, res, next) {
    res.render('blogs');
});

router.get('/new', requireAuth, function(req, res, next) {
    res.render('new_blog', { error: null });
});

router.post('/new', requireAuth, function(req, res, next) {
    const { title, content } = req.body;

    if (!title || !content) {
        res.render("new_blog", { error: "Missing title or content" });
    }


    const blogs = JSON.parse(fs.readFileSync(BLOGS_FILE));
    // const newBlog = {
    //     id: String(Date.now()),
    //     title,
    //     content,
    //     author
    // }
    console.log(req.session.user.email);
    res.render('new_blog', { error: null });
});

module.exports = router;