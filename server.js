const express = require('express');
const sendEmailToQueue = require('./producer');
const { connectQueue } = require('./queue-config');

const app = express();
app.use(express.json());

// Endpoint to send email
app.post('/send-email', async (req, res) => {
    const { to, subject, body } = req.body;

    if (!to || !subject || !body) {
        return res.status(400).json({ error: "Missing email fields" });
    }

    await sendEmailToQueue({ to, subject, body });
    res.status(200).json({ message: "Email queued successfully!" });
});


connectQueue().then(() => {
    app.listen(3000, () => {
        console.log("🚀 Server running on http://localhost:3000");
    });
});