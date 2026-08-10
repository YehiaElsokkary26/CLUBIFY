const { body } = require('express-validator')

const clubApplicationValidator = [
  body('committeeId').notEmpty().withMessage('Committee ID is required').isUUID().withMessage('Must be a valid UUID'),
  body('interviewSlotId').notEmpty().withMessage('Interview slot ID is required').isUUID().withMessage('Must be a valid UUID'),
  body('motivationNote').optional().isLength({ max: 500 }).withMessage('Motivation note must be at most 500 characters'),
]

const volunteerApplicationValidator = [
  body('motivationNote').optional().isLength({ max: 300 }).withMessage('Motivation note must be at most 300 characters'),
]

module.exports = { clubApplicationValidator, volunteerApplicationValidator }
