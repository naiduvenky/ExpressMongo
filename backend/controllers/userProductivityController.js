const mongoose = require("mongoose");

const {userProductivitySchema} = require("../validations/userProductivityValidation")
const UserProductivity = require("../models/UserProductivity"); // Assuming you have a UserProductivity model

// Create a new userProductivity
// Function to calculate productivity percentage
function calculateProductivity(totalStudyTime, optimalStudyTime) {
  // Ensure that both totalStudyTime and optimalStudyTime are non-negative numbers
  if (totalStudyTime < 0 || optimalStudyTime < 0) {
    throw new Error("Study times must be non-negative numbers.");
  }

  // Calculate the productivity as a percentage
  const productivity = (totalStudyTime / optimalStudyTime) * 100;
  return productivity;
}

// Create a new userProductivity
exports.createUserProductivity = async (req, res) => {
  try {
    // Validate userProductivity input
    const { error, value } = userProductivitySchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const totalStudyTime = req.body.timing.reduce((a, b) => a + b, 0);
    const productivity = calculateProductivity(totalStudyTime, 360);

    const productivityObject = {
      userId: req.user.id, // Assign the user ID from the request
      dateOfEntry: req.body.dateOfEntry || new Date(),
      subjects: req.body.subjects,
      timing: req.body.timing,
      productivity: productivity,
    };

    // Save the new userProductivity document to the database
    const newUserProductivity = await UserProductivity.create(productivityObject);
    return res.status(201).json(newUserProductivity);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create UserProductivity" });
  }
};


// Get all userProductivity
exports.getAllUserProductivity = async (req, res) => {
  try {
    const userProductivity = await UserProductivity.find();
    return res.status(200).json(userProductivity);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve userProductivity" });
  }
};

// Controller function to get records between start and end dates for a specific user
exports.getRecordsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user.id;
    console.log(userId, startDate, endDate);
    // Validate input (you may want to add more validation)
    if (!userId || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // You can add code to validate the user and date range here

    const records = await UserProductivity.find({
      userId: userId,
      dateOfEntry: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).sort({ dateOfEntry: -1 });

    return res.status(200).json(records);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching records" });
  }
};

// Get a specific userProductivity by ID
exports.getUserProductivityById = async (req, res) => {
  const { id } = req.params;
  try {
    const userProductivity = await UserProductivity.findById(id);
    if (!userProductivity) {
      return res.status(404).json({ error: "UserProductivity not found" });
    }
    return res.status(200).json(userProductivity);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve UserProductivity" });
  }
};

// Update a userProductivity by ID
exports.updateUserProductivityById = async (req, res) => {
  const { id } = req.params;
  try {
    const totalStudyTime = req.body.timing.reduce((a, b) => a + b, 0);
    const productivity = calculateProductivity(totalStudyTime, 360);

    const productivityObject = {
      userId: req.user.id, // Assign the user ID from the request
      dateOfEntry: req.body.dateOfEntry || new Date(),
      subjects: req.body.subjects,
      timing: req.body.timing,
      productivity: productivity,
    };
    const updatedUserProductivity = await UserProductivity.findByIdAndUpdate(id, productivityObject, { new: true });
    if (updatedUserProductivity) {
      return res.status(200).json(updatedUserProductivity);
    }
    return res.status(404).json({ error: "UserProductivity not found" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update UserProductivity" });
  }
};

// Delete a userProductivity by ID
exports.deleteUserProductivityById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await UserProductivity.findByIdAndRemove(id);
    if (deleted) {
      return res.status(204).send({ message: "Productivity Record Deleted Successfully!" });
    }
    return res.status(404).json({ error: "UserProductivity not found" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete UserProductivity" });
  }
};
