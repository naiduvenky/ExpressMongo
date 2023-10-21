
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUserSchema } = require('../validations/userValidation');
const User  = require('../models/User'); // Import your User model

// Controller to create a new user
exports.createUser = async (req, res) => {
  try {
    // Validate user input
    const { error, value } = createUserSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if a user with the same email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email: value.email }, { username: value.username }],
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already exists.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(value.password, saltRounds);
    value.password = hashedPassword;

    // Create a new user
    const user = await User.create(value);
    user.password = undefined; // Remove the hashed password from the response
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error creating user' });
  }
};

// Controller to get a list of all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password field
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching users' });
  }
};

// Controller to get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, { password: 0 }); // Exclude password field
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching user' });
  }
};

// Controller to update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const newUser = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
    newUser.password = hashedPassword;
    const user = await User.findByIdAndUpdate(id, newUser, {
      new: true,
      select: { password: 0 }, // Exclude password field
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating user' });
  }
};

// Controller to delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndRemove(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error deleting user' });
  }
};

// Controller for user authentication (login)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Compare the input password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // User is authenticated, generate a JWT token
    const secretKey = 'your-secret-key'; // Replace with your actual secret key
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '7h' });

    // Return the token in the response
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error during authentication' });
  }
};
