//express/router setup 
import express from 'express'
const router = express.Router();

//import models associations
import  Post, { User }  from '../../models';
import Comment from '../../models';

//get all users
router.get('/', (req, res) => {
    User.findAll({
        //exclude passwords after testing functionality
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
})

//get a single user
router.get('/:id', (req, res) => {
    User.findOne({})
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this ID'})
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
})

//create a user
router.post('/', (req, res) => {
    User.create({})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
})

//user login 
router.post('/login', (req, res) => {

})

//user logout
router.post('/logout', (req, res) => {

})

//update a user
router.put('/:id', (req, res) => {
    User.update({})
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this ID'})
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
})

//delete a user
router.delete('/:id', (req, res) => {
    User.delete({})
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this ID'})
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});