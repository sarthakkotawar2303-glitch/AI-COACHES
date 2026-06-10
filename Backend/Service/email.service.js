const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // If you don't have real credentials, configure them in your .env file:
    // SMTP_HOST, SMTP_PORT, SMTP_EMAIL, SMTP_PASSWORD

    let transporter;

    if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_PORT == 465,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        
        const mailOptions = {
            from: `Resume Builder <${process.env.SMTP_EMAIL}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };
    
        await transporter.sendMail(mailOptions);
    } else {
        // Fallback: Just log the email for testing purposes
        console.log("\n-----------------------------------------");
        console.log("🔔 MOCK EMAIL SENT:");
        console.log(`To: ${options.email}`);
        console.log(`Subject: ${options.subject}`);
        console.log(`Message:\n${options.message}`);
        console.log("-----------------------------------------\n");
    }
};

module.exports = sendEmail;
