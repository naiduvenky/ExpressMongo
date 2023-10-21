const joiProfile = require('joi');

// Define a regular expression for email validation
// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Define the validation schema for creating a user with custom error messages and email format validation
const createUserProfileSchema = joiProfile.object({
  address: joiProfile.string().required().messages({
    'any.required': 'address is required.',
    'string.empty': 'address cannot be empty.',
  }),
  city: joiProfile.string().required().messages({
    'any.required': 'city is required.',
    'string.empty': 'city cannot be empty.',
  }),
  state: joiProfile.string().required().messages({
    'any.required': 'state is required.',
    'string.empty': 'state cannot be empty.',
  }),
  country: joiProfile.string().required().messages({
    'any.required': 'country is required.',
    'string.empty': 'country cannot be empty.',
  }),
  mobileNumber: joiProfile.string().required().messages({
    'any.required': 'mobileNumber is required.',
    'string.empty': 'mobileNumber cannot be empty.',
  }),
  adharNumber: joiProfile.string().required().messages({
    'any.required': 'adharNumber is required.',
    'string.empty': 'adharNumber cannot be empty.',
  }),
  // userId: joiProfile.string().required().messages({
  //   'any.required': 'userId is required.',
  //   'string.empty': 'userId cannot be empty.',
  // }),

});

module.exports = {
  createUserProfileSchema,
};
