//express/router setup 
import express from 'express'
const router = express.Router();

//import models associations
import Comment, { Post } from '../../models';
import User from '../../models';

//router get all
router.get('/', (req, res) => {
    Post.findAll({})
});
//router get one
router.get('/:id', (req, res) => {
    Post.findOne({})
});
//router create
router.post('/', (req, res) => {
    Post.create({})

});
//router update
router.put('/:id', (req, res) => {
    Post.update({})
});
//router delete
router.delete('/', (req, res) => {
    Post.destroy({})
});