const { getChannel } = require('./queue-config');
/**
 * Send the email data to the RabbitMQ queue
 * @param {Object} emailData The data of the email to be sent
 */
async function sendEmailToQueue(emailData) {
    const channel = getChannel();
    channel.sendToQueue("emailQueue", Buffer.from(JSON.stringify(emailData)), {
        persistent: true,
        contentType: 'application/json'
    });
    console.log("Email data sent to queue");
}

module.exports = { sendEmailToQueue };