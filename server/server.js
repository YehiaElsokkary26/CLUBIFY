require('dotenv').config()
const app = require('./app')
const { PORT } = require('./src/config/env')
const { calculateClubOfWeek } = require('./src/services/clubOfWeek.service')

const port = PORT || 5000
const WEEK_MS = 7 * 24 * 60 * 60 * 1000

app.listen(port, () => {
  console.log(`Clubify server running on port ${port}`)
  calculateClubOfWeek().catch(console.error)
  setInterval(() => calculateClubOfWeek().catch(console.error), WEEK_MS)
})
