// users.js

const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authMiddleware")
const UserProfileController = require('../controllers/userProfileController');

// Create a new user
router.post('/', authenticate,UserProfileController.createUserProfile);

// Get a list of all users
router.get('/', authenticate,UserProfileController.getUserProfile);

// Get a single user by ID
router.get('/:id', authenticate, UserProfileController.getUserProfileById);

// Update a user by ID
router.put('/:id', authenticate,UserProfileController.updateUserProfile);

// Delete a user by ID
router.delete('/:id',authenticate,  UserProfileController.deleteUserProfile);

module.exports = router;
