const express = require('express');
const router = express.Router();
const fs = require('fs');

const BLOGS_FILE = 'blogs.json';

const requireAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

router.get('/', requireAuth, function(req, res, next) {
    const blogs = JSON.parse(fs.readFileSync(BLOGS_FILE));
    res.render('blogs', { blogs });
});

router.get('/new', requireAuth, function(req, res, next) {
    res.render('new_blog', { error: null });
});

router.post('/new', requireAuth, function(req, res, next) {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.render("new_blog", { error: "Missing title or content" });
    }

    try {
        const data = fs.readFileSync(BLOGS_FILE);
        const blogs = data.length ? JSON.parse(data) : [];

        const newBlog = {
            id: String(Date.now()),
            title,
            content,
            author: req.session.user.email
        };

        blogs.push(newBlog);

        fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));

        res.redirect('/blogs');
    } catch (err) {
        console.error(err);
        res.render('new_blog', { error: "Something went wrong. Please try again." });
    }
});

router.get('/:id', requireAuth, (req, res) => {
    try {
        const data = fs.readFileSync(BLOGS_FILE);
        const blogs = JSON.parse(data);
        const blog = blogs.find(b => b.id === req.params.id);

        if (!blog) {
            return res.status(404).send('Post not found');
        }

        res.render('post', { blog });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;