const {
    uploadImage,
    repChars,
    retInv,
    retPlayers
} = require("./funcs"), {
    name,
    serverAddress
} = require("./config.json");
module.exports = {
    updateGUI: (sent, bot, inGame) => {
        if (inGame) {
            uploadImage().then(link => {
                console.log("updated " + Date.now());
                const embed = {
                    color: 0x0099ff,
                    title: `${name} | ${serverAddress}`,
                    url: `https://${serverAddress}/`,
                    image: {
                        url: link,
                    },
                    fields: [{
                            name: 'Health',
                            value: repChars(Math.ceil(bot.health / 2), ":heart:"),
                            inline: true,
                        },
                        {
                            name: 'Food',
                            value: repChars(Math.ceil(bot.food / 2), ":poultry_leg:"),
                            inline: true,
                        },
                        {
                            name: 'EXP Level',
                            value: bot.experience.level,
                            inline: true,
                        },
                        {

                            name: 'Active Slot',
                            value: bot.quickBarSlot + 1,
                            inline: true,
                        },
                        {
                            name: "Day",
                            value: `${bot.time.day}th day`,
                            inline: true,
                        },
                        {
                            name: "Time",
                            value: `${Math.ceil(bot.time.timeOfDay / 2000)} O'clock`,
                            inline: true,
                        },
                        {
                            name: "X",
                            value: Math.floor(bot.entity.position.x),
                            inline: true,
                        },
                        {
                            name: "Y",
                            value: Math.floor(bot.entity.position.y),
                            inline: true,
                        },
                        {
                            name: "Z",
                            value: Math.floor(bot.entity.position.z),
                            inline: true,
                        },
                        {
                            name: 'Inventory',
                            value: retInv(bot),
                        },
                        {
                            name: 'Players',
                            value: retPlayers(bot)
                        }
                    ],
                    footer: {
                        text: 'subscribe!'
                    },
                    timestamp: new Date(),
                }
                sent.edit({
                    embed: embed
                });
            })
        }
    }
}