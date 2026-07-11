const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    // Validate required env vars before trying to send
    const required = ['EMAIL_USER', 'EMAIL_PASS'];
    const missing = required.filter(k => !process.env[k]);
    if (missing.length > 0) {
        throw new Error(`Missing SMTP environment variables: ${missing.join(', ')}`);
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpSecure = process.env.SMTP_SECURE
        ? process.env.SMTP_SECURE === 'true'
        : smtpPort === 465;

    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT_MS) || 30000,
        greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT_MS) || 30000,
        socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT_MS) || 30000,
    });

    console.log('Sending email via', smtpHost, 'to', options.to);

    const timeoutMs = Number(process.env.EMAIL_TIMEOUT_MS) || 30000;
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Email delivery timed out')), timeoutMs);
    });

    await Promise.race([
        transporter.sendMail({
            from: process.env.EMAIL_FROM || `"AI Cold Mail Generator" <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html || `<p>${options.text}</p>`,
        }),
        timeoutPromise,
    ]);
    console.log("Email sent successfully");
};

module.exports = sendEmail;
