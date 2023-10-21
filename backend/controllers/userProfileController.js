const UserProfile = require('../models/UserProfile');
const { createUserProfileSchema } = require('../validations/userProfileValidation');


// Create a new user profile
exports.createUserProfile = async (req, res) => {
  try {
    // Validate user input
    const { error, value } = createUserProfileSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if a user with the same mobileNumber, adharNumber, and userId already exists
    const existingUserProfile = await UserProfile.findOne({
      $or: [
        { mobileNumber: value.mobileNumber },
        { adharNumber: value.adharNumber },
        { userId: req.user.id },
      ],
    });

    if (existingUserProfile) {
      return res.status(400).json({ error: 'Mobile number, Adhar number, or user profile already exists.' });
    }

    value.userId = req.user.id;

    // Create a new user profile
    const userProfile = await UserProfile.create(value);
    return res.status(201).json(userProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create user profile' });
  }
};

// Get the user's own profile
exports.getUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ userId: req.user.id });
    return res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
};

// Get a specific user profile by ID
exports.getUserProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const userProfile = await UserProfile.findById(id);
    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    return res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
};

// Update the user's own profile
exports.updateUserProfile = async (req, res) => {
  req.body.userId = req.user.id;
  try {
    const userProfile = await UserProfile.findOneAndUpdate({ userId: req.user.id }, req.body, { new: true });
    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    return res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update user profile' });
  }
};

// Delete the user's own profile
exports.deleteUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOneAndDelete({ userId: req.user.id });
    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete user profile' });
  }
};
