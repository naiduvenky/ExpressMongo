const mongoose = require('mongoose');
const { Schema } = mongoose;

const userProductivitySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  
  dateOfEntry: {
    type: Date,
    required: true,
  },
  subjects: {
    type: [String], // Array of strings
    required: true,
    default: [],
  },
  timing: {
    type: [Number], // Array of integers
    required: true,
    default: [],
  },
  productivity: {
    type: Number, // Assuming productivity will be stored as an integer
    required: true,
  },
});

const UserProductivity = mongoose.model('UserProductivity', userProductivitySchema);

module.exports = UserProductivity;
