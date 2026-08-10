const { body } = require('express-validator')

const clubApplicationValidator = [
  body('committeeId').notEmpty().withMessage('Committee ID is required').isUUID().withMessage('Must be a valid UUID'),
  body('motivationNote').optional().isLength({ max: 500 }).withMessage('Motivation note must be at most 500 characters'),
]

const volunteerApplicationValidator = [
  body('motivationNote').optional().isLength({ max: 300 }).withMessage('Motivation note must be at most 300 characters'),
]

const selectSlotValidator = [
  body('slotId').notEmpty().withMessage('Slot ID is required').isUUID().withMessage('Must be a valid UUID'),
]

module.exports = { clubApplicationValidator, volunteerApplicationValidator, selectSlotValidator }
