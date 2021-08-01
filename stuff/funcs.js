const {
    itemToString,
    splitAt
} = require('./utils'), puppeteer = require('puppeteer'),
    mineflayerViewer = require('prismarine-viewer').mineflayer,
    mineflayer = require('mineflayer'), {
        serverAddress,
        serverPort,
        name,
        prismarinePort,
        imgBBApiKey,
        imagePath
    } = require("./config.json"),
    events = require('events').EventEmitter.defaultMaxListeners = Infinity,
    imgbbUploader = require("imgbb-uploader"), {
        pathfinder,
        Movements,
        goals: {
            GoalNear
        }
    } = require('mineflayer-pathfinder')




module.exports = {
    startLoop: async function (bot) {
        console.log(1);
        const browser = await puppeteer.launch({
                defaultViewport: null
            }),
            page = await browser.newPage();
        await page.goto('http://localhost:' + prismarinePort)

        var e = setInterval(() => {
            page.screenshot({
                path: imagePath
            });
        }, 15e2)
        bot.on("end", () => {
            clearInterval(e);
            console.log(2);
        })

    },
    startBotInstance: () => {
        const bot = mineflayer.createBot({
            host: serverAddress,
            port: serverPort,
            username: name,
            viewDistance: "tiny"
        })
        bot.loadPlugin(pathfinder)
        bot.once('spawn', () => {
            console.log("Joined");
            mineflayerViewer(bot, {
                port: prismarinePort,
                firstPerson: true
            })
        })
        return bot;
    },
    startAFKBot: () => {
        function createBot() {
            const bot = mineflayer.createBot({
                host: serverAddress,
                port: serverPort,
                username: "e",
                viewDistance: "tiny"
            })
            bot.once('spawn', () => {
                console.log("Joined");
            })
            bot.on("end",createBot);
        }
        createBot();
        
    },
    uploadImage: async () => {
        return await imgbbUploader({
                apiKey: imgBBApiKey,
                imagePath: imagePath
            })
            .then((res) => {
                return res.url;
            })
            .catch((e) => {
                console.error(`Handle error: ${e}`);
            });
    },
    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    repChars: (len, char) => {
        return new Array(len + 1).join(char);
    },
    retInv: (bot) => {
        const output = bot.inventory.items().map(itemToString).join(', ')
        if (output) {
            if (out.length > 500) {
                return splitAt(500)(output)[0]
            } else {
                return output
            }
        } else {
            return "Empty"
        }
    },
    retPlayers: (bot) => {
        var str = "";
        for (var name in bot.players) {
            str += `${name} > [${bot.players[name].ping}]  |  `
        }
        if (str.length > 500) {
            return splitAt(500)(str)[0]
        } else {
            return str
        }
    }
}