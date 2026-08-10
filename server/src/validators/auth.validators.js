const { body } = require('express-validator')

const registerValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .custom((value) => {
      if (!/@guc\.edu\.eg$|@student\.guc\.edu\.eg$/.test(value)) {
        throw new Error('Email must end in @guc.edu.eg or @student.guc.edu.eg')
      }
      return true
    }),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number'),
  body('studentId').notEmpty().withMessage('Student ID is required'),
  body('faculty').notEmpty().withMessage('Faculty is required'),
  body('year')
    .notEmpty().withMessage('Year is required')
    .isInt({ min: 1, max: 6 }).withMessage('Year must be an integer between 1 and 6'),
]

const loginValidator = [
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Must be a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
]

module.exports = { registerValidator, loginValidator }
