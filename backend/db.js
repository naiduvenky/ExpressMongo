const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/ProductivityTracker');
    console.log('Connected!');
  } catch (error) {
    console.error('Connection failed:', error);
  }
};

module.exports = connectToMongoDB
