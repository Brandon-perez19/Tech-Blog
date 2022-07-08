//express/router setup 
import express from 'express'
const router = express.Router();

//import api routes 
import postRoutes from './postRoutes.js';
import userRoutes from './userRoutes.js';
import commentRoutes from './commentRoutes.js';

//endpoints
router.use('/post', postRoutes);
router.use('/user', userRoutes);
router.use('/comment', commentRoutes);

//export
export default router