const { body } = require('express-validator')

const updateClubValidator = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('description').optional().isString(),
  body('category').optional().isString(),
]

const recruitingValidator = [
  body('isRecruiting').isBoolean().withMessage('isRecruiting must be a boolean'),
]

const eventValidator = [
  body('title').notEmpty().withMessage('Event title is required'),
  body('date').notEmpty().withMessage('Event date is required').isISO8601().withMessage('Date must be ISO 8601'),
  body('time').notEmpty().withMessage('Event time is required'),
  body('location').notEmpty().withMessage('Event location is required'),
  body('type').notEmpty().withMessage('Event type is required'),
]

const announcementValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('body').notEmpty().withMessage('Body is required'),
  body('pinned').optional().isBoolean(),
]

const socialLinksValidator = [
  body('instagram').optional().isURL().withMessage('Instagram must be a valid URL'),
  body('facebook').optional().isURL().withMessage('Facebook must be a valid URL'),
  body('linkedin').optional().isURL().withMessage('LinkedIn must be a valid URL'),
  body('tiktok').optional().isURL().withMessage('TikTok must be a valid URL'),
  body('website').optional().isURL().withMessage('Website must be a valid URL'),
]

const slotValidator = [
  body('date').notEmpty().withMessage('Date is required').isISO8601().withMessage('Must be ISO 8601'),
  body('time').notEmpty().withMessage('Time is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('capacity').isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
]

const committeeValidator = [
  body('name').notEmpty().withMessage('Committee name is required'),
  body('head').optional().isString(),
]

module.exports = {
  updateClubValidator,
  recruitingValidator,
  eventValidator,
  announcementValidator,
  socialLinksValidator,
  slotValidator,
  committeeValidator,
}
