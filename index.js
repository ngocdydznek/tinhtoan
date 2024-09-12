require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const math = require('mathjs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async message => {
    if (message.author.bot) return; // Bỏ qua tin nhắn từ bot

    const prefix = '!calc';
    if (message.content.startsWith(prefix)) {
        const expression = message.content.slice(prefix.length).trim();

        if (!expression) {
            return message.channel.send('Vui lòng nhập biểu thức cần tính.');
        }

        try {
            const result = math.evaluate(expression);
            message.channel.send(`Kết quả: ${result}`);
        } catch (error) {
            message.channel.send('Biểu thức không hợp lệ. Hãy chắc chắn rằng bạn đã nhập đúng công thức toán học.');
        }
    }
});

client.login(process.env.TOKEN);
