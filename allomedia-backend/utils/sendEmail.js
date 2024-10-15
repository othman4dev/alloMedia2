const nodemailer = require('nodemailer');

// Function to send email
const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // You can use any service like Gmail, Outlook, etc.
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: 'alloMedia <noreply@allomedia.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;