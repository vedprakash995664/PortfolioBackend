const FormData = require('../Models/FormData');
const { sendEmail } = require('../Services/emailService');

// Controller method to handle form submission
exports.submitForm = async (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newFormData = new FormData({
            name,
            email,
            message,
        });

        // Save the form data to MongoDB
        await newFormData.save();

        // Create HTML content for the email with enhanced design (no image)
        const emailSubject = "Thank you for reaching out!";
        const emailHTMLContent = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                            color: #333;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: white;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        h1 {
                            color: #007BFF;
                            margin-bottom: 10px;
                        }
                        p {
                            font-size: 16px;
                            line-height: 1.6;
                        }
                        .message {
                            background-color: #f9f9f9;
                            padding: 15px;
                            border-left: 4px solid #007BFF;
                            margin-top: 20px;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 30px;
                            font-size: 14px;
                            color: #777;
                        }
                        blockquote {
                            font-style: italic;
                            color: #555;
                            padding-left: 20px;
                            border-left: 4px solid #007BFF;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Thank you, ${name}!</h1>
                        </div>
                        <p>We received your message and will get back to you shortly.</p>
                        <div class="message">
                            <strong>Your Message:</strong>
                            <blockquote>${message}</blockquote>
                        </div>
                        <div class="footer">
                            <p>Best regards,<br>Er. Ved Prakash ❤️</p>
                        </div>
                    </div>
                </body>
            </html>
        `;

        // Send the email
        await sendEmail(email, emailSubject, emailHTMLContent);

        res.status(200).json({ message: "Form data saved successfully and email sent" });
    } catch (err) {
        console.error("Error saving data or sending email:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
