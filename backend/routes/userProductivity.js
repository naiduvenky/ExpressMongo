// users.js

const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authMiddleware")
const UserProductivityController = require('../controllers/userProductivityController');

// Create a new userProductivity
router.post('/', authenticate, UserProductivityController.createUserProductivity);

// Get a list of all usersProductivity
router.get('/', authenticate, UserProductivityController.getAllUserProductivity);
router.get('/records', authenticate, UserProductivityController.getRecordsByDateRange);

// Get a single userProductivity by ID
router.get('/:id',authenticate, UserProductivityController.getUserProductivityById);

// Update a userProductivity by ID
router.put('/:id', authenticate, UserProductivityController.updateUserProductivityById);

// Delete a userProductivity by ID
router.delete('/:id',authenticate, UserProductivityController.deleteUserProductivityById);

module.exports = router;
