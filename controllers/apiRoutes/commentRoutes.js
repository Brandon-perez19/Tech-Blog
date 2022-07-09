//express/router setup 
import express from 'express'
const router = express.Router();
import {Comment} from '../../models/index.js'

//router get all
router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
});

//router create
router.post('/', (req, res) => {
    //check the session 
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    }
});

//router delete
router.delete('/:id', (req, res) => {
    //check the session
    if (req.session) {
        Comment.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(dbCommentData => {
                if (!dbCommentData) {
                    res.status(404).json({ message: 'No comment found with this id' });
                    return;
                }
                res.json(dbCommentData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    }
});

export default router;