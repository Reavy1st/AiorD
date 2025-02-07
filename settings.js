const fs = require('fs');
const chalk = require('chalk');

// Settings Bot 
global.linkowner = 'wa.me/6281997715124' // Ganti dengan nomor WhatsApp owner
global.owner = '6281997715124' // Ganti dengan nomor WhatsApp owner
global.namastore = "AiorDev Store"
global.versi = "1.0"
global.namaOwner = "AiorDev"
global.packname = 'AiorDev Bot'
global.botname = 'AiorDev Bot'
global.botname2 = 'AiorDev'
global.thumbnail = 'https://i.postimg.cc/fLy6n640/zerodev.jpg' // Ganti dengan link thumbnail bot
global.tempatDB = 'database.json'
global.pairing_code = true // Aktifkan pairing code
global.simbol = 'ッ'

// Message Command 
global.mess = {
    owner: "*Akses Ditolak*\nFitur ini hanya untuk owner bot!",
    admin: "*Akses Ditolak*\nFitur ini hanya untuk admin grup!",
    botAdmin: "*Akses Ditolak*\nFitur ini hanya untuk ketika bot menjadi admin!",
    group: "*Akses Ditolak*\nFitur ini hanya untuk dalam grup!",
    private: "*Akses Ditolak*\nFitur ini hanya untuk dalam private chat!",
    prem: "*Akses Ditolak*\nFitur ini hanya untuk user premium!",
    wait: 'Loading...',
    error: 'Error!',
    done: 'Done'
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.blueBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
