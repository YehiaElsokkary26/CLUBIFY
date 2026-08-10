const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const corsOptions = require('./src/config/cors')
const notFound = require('./src/middleware/notFound')
const errorHandler = require('./src/middleware/errorHandler')

const authRoutes = require('./src/routes/auth.routes')
const clubsRoutes = require('./src/routes/clubs.routes')
const volunteerRoutes = require('./src/routes/volunteer.routes')
const applicationsRoutes = require('./src/routes/applications.routes')
const notificationsRoutes = require('./src/routes/notifications.routes')
const usersRoutes = require('./src/routes/users.routes')
const adminRoutes = require('./src/routes/admin.routes')
const uploadRoutes = require('./src/routes/upload.routes')
const feedRoutes = require('./src/routes/feed.routes')

const app = express()

app.use(helmet())
app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/clubs', clubsRoutes)
app.use('/api/volunteer', volunteerRoutes)
app.use('/api/applications', applicationsRoutes)
app.use('/api/notifications', notificationsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/feed', feedRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
