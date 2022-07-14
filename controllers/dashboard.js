//express/router setup 
import express from 'express'
const router = express.Router();

//importing associations
import {Post, User, Comment} from '../models/index.js'

router.get('/', (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        }, 
        attributes: ['id', 'title', 'post_content','created_at'],
        include: [{
            model: Comment,
            attributes: ['id','comment_text', 'post_id', 'user_id', 'created_at'],
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model:User,
                attributes:['username']
            }]
        }]
    })
    .then (dbPostData => {
        //serialize data before passing to template
        const posts = dbPostData.map(post => post.get({plain: true}));
        res.render('dashboard', {posts, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.get('/edit/:id', (req, res) => {
    Post.findByPk(req.params.id, {
        attributes: ['id', "title", 'user_id', 'created_at', 'post_content'],
        include: [{
            model: Comment,
            attributes: ['id','comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            },
        },
        {
            model: User,
            attributes:['username']
        }]
    })
    .then(dbPostData => {
        if(dbPostData){
            const post = dbPostData.get({plain: true });
            console.log(post)
            res.render('edit-post', {post, loggedIn: true});
        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

export default router