//express/router setup 
import express from 'express'
const router = express.Router();

import {Post, User, Comment} from '../models/index.js'

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'post_url','created_at'],
        include: [{
            model: Comment,
            attributes: ['id','comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes:['username']
        }]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({plain: true}));
        //passing a single post object into the homepage template
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.get('/login', (req, res) => {
    //if user is already logged in, redirect to homepage
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    //if user is not logged in, send them to login page
    console.log(req.session);
    res.render('login');
})

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_url','created_at'],
        include:[ {
            model: Comment,
            attributes: ['id','comment_text', 'post_id', 'user_id', 'created_at'],
            include:{
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes:['username']
        }] 
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message: 'No posts found with that ID.'});
            return;
        }
        const post = dbPostData.get({ plain:true })

        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

export default router