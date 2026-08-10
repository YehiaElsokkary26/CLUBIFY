const { body } = require('express-validator')

const createVolunteerValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('date').notEmpty().withMessage('Date is required').isISO8601().withMessage('Must be ISO 8601'),
  body('location').notEmpty().withMessage('Location is required'),
  body('spotsTotal').isInt({ min: 1 }).withMessage('Spots total must be a positive integer'),
]

const updateVolunteerValidator = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().isString(),
  body('date').optional().isISO8601().withMessage('Must be ISO 8601'),
  body('location').optional().isString(),
  body('spotsTotal').optional().isInt({ min: 1 }).withMessage('Spots total must be a positive integer'),
]

module.exports = { createVolunteerValidator, updateVolunteerValidator }
