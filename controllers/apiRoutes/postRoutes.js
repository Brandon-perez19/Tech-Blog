//express/router setup 
import express from 'express'
const router = express.Router();

//import models associations
import {Comment, Post, User} from '../../models/index.js';


//router get all
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'post_url', 'user_id'],
        //orders the results based on creation from newest to oldest
        order: [['created_at', 'DESC']],
        include: {
            model: Comment,
            attributes: ['id','comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});
//router get one
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Comment,
            attributes: ['id','comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    }).then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'No posts were found with that ID.'})
            return
        }
        res.json(dbPostData);
    })
});
//router create
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});
//router update
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {    where:{
                id: req.params.id
            }   
        }
    )
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'No post were found with that ID.'});
            return
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
    });
//router delete
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'No post were found with that ID.'})
            return
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

export default router