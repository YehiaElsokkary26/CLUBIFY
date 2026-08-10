const { CLIENT_URL } = require('./env')

module.exports = {
  origin: CLIENT_URL,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}
