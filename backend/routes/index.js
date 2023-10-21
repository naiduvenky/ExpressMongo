const express = require('express');
const app = express();

// Import your route files
const user = require('./user');
 const userProfile = require('./userProfile');
 const userProductivity = require('./userProductivity');


// Use the imported routes
app.use('/user', user);
 app.use('/userProfile', userProfile);
app.use('/userProductivity',userProductivity);

module.exports = app;
