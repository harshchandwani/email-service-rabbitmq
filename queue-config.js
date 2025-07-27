//queue configuration
const amqp = require('amqplib');

let channel, connection;

async function connectQueue() {
    const amqpServer = process.env.AMQP_SERVER || 'amqp://localhost';
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("emailQueue");
    console.log("Connected to RabbitMQ");
}


function getChannel() {
    if (!channel) {
        throw new Error("Channel is not initialized. Call connectQueue() first.");
    }
    return channel;
}

module.exports = { connectQueue, getChannel };