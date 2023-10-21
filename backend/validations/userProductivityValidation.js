const joiProductivity = require('joi');

const userProductivitySchema = joiProductivity.object({
  UserId: joiProductivity.string(),
  dateOfEntry: joiProductivity.string().regex(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)$/).required().messages({
    'any.required': 'Date of entry is required.',
  }),
  subjects: joiProductivity.array().items(joiProductivity.string()).required().messages({
    'array.base': 'Subjects must be an array of strings.',
    'any.required': 'Subjects are required.',
  }),
  timing: joiProductivity.array().items(joiProductivity.number()).required().messages({
    'array.base': 'Timing must be an array of numbers.',
    'any.required': 'Timing is required.',
  }),
});

module.exports = {
  userProductivitySchema,
};

