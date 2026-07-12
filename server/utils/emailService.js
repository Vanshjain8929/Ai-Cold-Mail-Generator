const axios = require("axios");

const sendEmail = async (options) => {
    try {

        const response = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "AI Cold Mail Generator",
                    email: process.env.EMAIL_USER,
                },

                to: [
                    {
                        email: options.to,
                    },
                ],

                subject: options.subject,

                htmlContent: options.html,

                textContent: options.text,
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );

        console.log("✅ Email sent");
        console.log(response.data);

        return response.data;

    } catch (err) {

        console.error("Brevo Error:");

        if (err.response) {
            console.log(err.response.data);
        } else {
            console.log(err.message);
        }

        throw err;
    }
};

module.exports = sendEmail;