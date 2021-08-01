const {
    discordToken,
    prefix,
    serverAddress,
    name
} = require("./stuff/config.json"), Discord = require('discord.js'), client = new Discord.Client(), {
    startBotInstance,
    startLoop,
    uploadImage,
    sleep
} = require("./stuff/funcs"), disbut = require("discord-buttons"), {
    updateGUI
} = require("./stuff/gui"), {
    GoalXZ
} = require('mineflayer-pathfinder').goals, {
    pathfinder,
    Movements,
    goals: {
        GoalNear
    }
} = require('mineflayer-pathfinder')

disbut(client);
var bot, inGame = false,
    buttons = [
        new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('1')
        .setID('1'),
        new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('2')
        .setID('2'),
        new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('3')
        .setID('3'),
        new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('4')
        .setID('4'),
        new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('5')
        .setID('5')
    ],
    buttons2 = [
        new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('6')
        .setID('6'),
        new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('7')
        .setID('7'),
        new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('8')
        .setID('8'),
        new disbut.MessageButton()
        .setStyle('blurple')
        .setLabel('9')
        .setID('9'),
        new disbut.MessageButton()
        .setStyle('red')
        .setLabel('Leave Server')
        .setID('leave')
    ],
    row = new disbut.MessageActionRow()
    .addComponents(buttons),
    row2 = new disbut.MessageActionRow()
    .addComponents(buttons2);


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    var arg = msg.content.replace(prefix, "").toLocaleLowerCase().split(/ +/);
    switch (arg[0]) {
        case "join":
            msg.channel.send("Joining Server.....").then(sent => {
                bot = startBotInstance();
                bot.once("physicTick", async () => {
                    await sleep(9e2);
                    startLoop(bot);
                    inGame = true;
                    sent.edit("Joined Server....");
                    async function loop() {
                        if (!inGame) {
                            return 1;
                        } else {
                            updateGUI(sent, bot, inGame);
                        }
                        await sleep(2e3);
                        loop();
                    }
                    loop();
                });
                bot.on('end', () => {
                    inGame = false;
                    sent.edit("Bot Has Left The Server");
                })
                msg.channel.send("_ _", row);
                msg.channel.send("_ _", row2);
                msg.channel.send("_ _", new disbut.MessageButton()
                    .setStyle('grey')
                    .setLabel('Use Item')
                    .setID('use'));
            });

            break;
        case "test":
            msg.channel.send("Joining Server.....").then(async sent => {
                uploadImage().then(link => {
                    sent.edit({
                        embed: {
                            color: 0x0099ff,
                            title: `${name} | ${serverAddress}`,
                            url: `https://${serverAddress}/`,
                            image: {
                                url: link,
                            },
                            fields: [{
                                    name: 'Inline field title',
                                    value: 'Some value here',
                                    inline: true,
                                },
                                {
                                    name: 'Inline field title',
                                    value: 'Some value here',
                                    inline: true,
                                },
                                {
                                    name: 'Inline field title',
                                    value: 'Some value here',
                                    inline: true,
                                },
                                {
                                    name: 'Inline field title',
                                    value: 'Some value here',
                                }
                            ],
                            footer: {
                                text: 'subscrab!'
                            },
                            timestamp: new Date(),
                        }
                    });
                })

            });
            break;
        case "goto":
            if (!inGame) return;
            const mcData = require('minecraft-data')(bot.version),
                defaultMove = new Movements(bot, mcData);
            bot.pathfinder.setMovements(defaultMove)
            bot.pathfinder.setGoal(new GoalXZ(arg[1], arg[2]))
            break;
    }
});
client.on('clickButton', async (button) => {
    var id = button.id;
    if (id == "leave") {
        bot.chat("Goodbye!");
        bot.end();
    } else if (/1|2|3|4|5|6|7|8|9/.test(parseInt(id))) {
        bot.setQuickBarSlot(parseInt(id) - 1);
    } else if (id == "use") {
        bot.activateItem();
        await sleep(500);
        bot.deactivateItem();
    }
});

client.login(discordToken);