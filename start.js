const { useMultiFileAuthState, makeWASocket, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const chalk = require('chalk');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const settings = require('./settings');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false, // Nonaktifkan QR code di terminal
        logger: console,
    });

    sock.ev.on('creds.update', saveCreds);

    // Generate Pairing Code
    sock.ev.on('connection.update', (update) => {
        const { connection, qr, isNewLogin } = update;

        if (connection === 'close') {
            console.log(chalk.red('Koneksi terputus, mencoba menghubungkan kembali...'));
            startBot();
        } else if (connection === 'open') {
            console.log(chalk.green('Bot berhasil terhubung!'));
        }

        if (qr && settings.pairing_code) {
            console.log(chalk.yellow('Scan QR code berikut untuk menghubungkan bot:'));
            qrcode.generate(qr, { small: true });
        }
    });

    // Handle Messages
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const userJid = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';

        if (text.toLowerCase() === 'menu') {
            const userName = msg.pushName || 'you';
            const buttonMessage = {
                text: `Hi @${userName}! Silakan pilih menu di bawah ini:`,
                footer: 'AiorDev - By AiorDev Team',
                buttons: [
                    { buttonId: 'owner', buttonText: { displayText: 'Owner' }, type: 1 },
                    { buttonId: 'grub', buttonText: { displayText: 'Grub' }, type: 1 },
                    { buttonId: 'payment', buttonText: { displayText: 'Payment' }, type: 1 },
                    { buttonId: 'store', buttonText: { displayText: 'Store' }, type: 1 },
                    { buttonId: 'panel', buttonText: { displayText: 'Panel' }, type: 1 },
                ],
                headerType: 1,
            };

            await sock.sendMessage(userJid, buttonMessage);
        }
    });

    // Handle Button Responses
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const userJid = msg.key.remoteJid;
        const buttonResponse = msg.message?.buttonsResponseMessage;

        if (buttonResponse) {
            const selectedButtonId = buttonResponse.selectedButtonId;
            let replyText = '';

            switch (selectedButtonId) {
                case 'owner':
                    replyText = 'Ini adalah menu Owner dari AiorDev Bot.';
                    break;
                case 'grub':
                    replyText = 'Ini adalah menu Grub dari AiorDev Bot.';
                    break;
                case 'payment':
                    replyText = 'Ini adalah menu Payment dari AiorDev Bot.';
                    break;
                case 'store':
                    replyText = 'Ini adalah menu Store dari AiorDev Bot.';
                    break;
                case 'panel':
                    replyText = 'Ini adalah menu Panel dari AiorDev Bot.';
                    break;
                default:
                    replyText = 'Menu tidak dikenali. Silakan coba lagi.';
            }

            await sock.sendMessage(userJid, { text: replyText });
        }
    });
}

startBot().catch((err) => console.error(chalk.red('Error starting bot:', err)));
