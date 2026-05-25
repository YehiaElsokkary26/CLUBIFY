require('dotenv').config()
const app = require('./app')
const { PORT } = require('./src/config/env')

const port = PORT || 5000

app.listen(port, () => {
  console.log(`Clubify server running on port ${port}`)
})
