const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    try {
        console.log("\n========== EMAIL SERVICE START ==========");

        // Check environment variables
        console.log("EMAIL_USER:", process.env.EMAIL_USER);
        console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
        console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length);

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error("Email credentials not configured in environment variables");
        }

        console.log("\nCreating transporter...");

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        console.log("Transporter created successfully");

        console.log("\nVerifying SMTP connection...");

        await transporter.verify();

        console.log("✅ SMTP connected successfully");

        console.log("\nPreparing mail...");

        console.log("To:", options.email);
        console.log("Subject:", options.subject);
        console.log("Message:", options.message);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: `<p>${options.message}</p>`,
        };

        console.log("\nSending email...");

        const info = await transporter.sendMail(mailOptions);

        console.log("✅ Email sent successfully");
        console.log("Message ID:", info.messageId);
        console.log("Response:", info.response);

        console.log("========== EMAIL SERVICE END ==========\n");

        return {
            success: true,
            message: "Email sent successfully",
            messageId: info.messageId,
        };
    } catch (error) {
        console.error("\n========== EMAIL ERROR ==========");
        console.error("Message:", error.message);
        console.error("Code:", error.code);
        console.error("Response:", error.response);
        console.error("Stack:\n", error.stack);
        console.error("========== EMAIL ERROR END ==========\n");

        throw new Error(`Failed to send email: ${error.message}`);
    }
};

module.exports = sendEmail;