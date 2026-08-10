const nodemailer = require('nodemailer')
const { EMAIL_FROM } = require('./env')

let transporter

async function createTransporter() {
  const testAccount = await nodemailer.createTestAccount()
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })
  return transporter
}

async function sendMail({ to, subject, html }) {
  if (!transporter) await createTransporter()
  const info = await transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject,
    html,
  })
  console.log('Email preview URL:', nodemailer.getTestMessageUrl(info))
  return info
}

module.exports = { createTransporter, sendMail }
