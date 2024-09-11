const { Client, GatewayIntentBits } = require('discord.js');
const math = require('mathjs');

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

client.on('messageCreate', message => {
    // Kiểm tra xem tin nhắn có bắt đầu bằng lệnh !calc không
    if (message.content.startsWith('!calc')) {
        // Lấy biểu thức tính toán từ tin nhắn
        const expression = message.content.slice(6).trim(); // Bỏ đi "!calc "

        try {
            // Sử dụng mathjs để tính toán biểu thức
            const result = math.evaluate(expression);

            // Gửi kết quả trở lại kênh
            message.channel.send(`Kết quả: ${result}`);
        } catch (error) {
            // Nếu có lỗi xảy ra, gửi thông báo lỗi
            message.channel.send('Biểu thức không hợp lệ. Hãy đảm bảo rằng bạn nhập đúng công thức toán học.');
        }
    }
});

client.login('MTIyNTg0NDgyNzM5MjgzOTY4MQ.GqAOnC.F3KbcSvqVGTiyZMRTiM-5jOuX6x7rPoW8rc2Go');
