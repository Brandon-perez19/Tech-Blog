//express/router setup 
import express from 'express'
const router = express.Router();

//imporing main routes 
import dashboard from './dashboard.js';
import homeRoutes from './home-routes.js'

//importing apiRoutes index.js
import apiRoutes from './apiRoutes/index.js'

//end point for homepage
router.use('/', homeRoutes);

//end point for dashboard
router.use('/dashboard', dashboard);

//end point for apiRoutes
router.use('/api', apiRoutes);

//if user request http that isnt supported
router.use((req,res) => {
    res.status(404).end();
});

export default router