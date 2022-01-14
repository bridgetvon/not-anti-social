//import all of the api routes to prefix their endpoint names and package them 

const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

//add prefix of /pizzas to routes created in pizza-routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;


