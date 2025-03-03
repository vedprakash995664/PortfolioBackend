const nodemailer = require('nodemailer');

// Create reusable transporter object using default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Using Gmail as an example (you can use any SMTP service)
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address or SMTP user
        pass: process.env.EMAIL_PASS, // Your Gmail password or SMTP password
    },
});

// Function to send an HTML email
const sendEmail = async (recipientEmail, subject, htmlContent) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Your email address
        to: recipientEmail,           // The recipient's email address
        subject: subject,             // Subject line
        html: htmlContent,            // HTML body of the email
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};

module.exports = { sendEmail };
