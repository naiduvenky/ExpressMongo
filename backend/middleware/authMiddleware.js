const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model
const secretKey = 'your-secret-key'; // Replace with your actual secret key

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Attach the user object to the request for further use in protected routes
    req.user = user;
    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticate;
