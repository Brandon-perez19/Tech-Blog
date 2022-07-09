//express/router setup 
import express from 'express'
const router = express.Router();

//import models associations
import {Comment, Post, User} from '../../models/index.js';
//get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
})

//get a single user
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_url', 'user_id']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at']
            }
    ]})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID' })
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
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData)
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
})

//user login 
router.post('/login', (req, res) => {
    User.findOne ({
        where: {
            email:req.body.email
        }
    }).then (dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No User found with that email address!'})
            return
        }

        //checks to see if the password the user enter is the one associated with the account
        const validatePassword = dbUserData.checkPassword(req.body.password);

        //if password does not match, send message:
        if(!validatePassword) {
            res.status(400).json({ message: 'Incorrect Password'})
            return;
        }

        req.session.save(() => {
            //declaring session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!'})
        })
    })
})

//user logout
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy( () => {
            res.status(204).end()
        })
    }
    else {
        res.status(404).end()
    }

})

//update a user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        //individual hooks 
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID' })
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
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

export default router