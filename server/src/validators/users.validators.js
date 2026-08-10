const { body } = require('express-validator')

const updateProfileValidator = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('bio').optional().isLength({ max: 300 }).withMessage('Bio must be at most 300 characters'),
  body('avatar_url').optional().isURL().withMessage('Avatar URL must be a valid URL'),
]

const preferencesValidator = [
  body('notifications_enabled').optional().isBoolean().withMessage('notifications_enabled must be a boolean'),
  body('language').optional().isIn(['en', 'ar']).withMessage('Language must be "en" or "ar"'),
]

module.exports = { updateProfileValidator, preferencesValidator }
