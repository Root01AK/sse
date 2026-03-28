const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or use SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"Booking Team" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};