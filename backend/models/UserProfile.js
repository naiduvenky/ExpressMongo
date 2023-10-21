const mongoose = require('mongoose');
const { Schema } = mongoose;

const userProfileSchema = new Schema({
  userId: {
    type: String, // Assuming you want to store UUID as a string
    required: true,
    ref: 'User', // Reference to the User model
    unique: true,
  },
  profilePictureURL: String,
  mobileNumber: {
    type: String,
    unique: true,
  },
  address: String,
  city: String,
  state: String,
  country: String,
  adharNumber: {
    type: String,
    unique: true,
  },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
