require("dotenv").config()
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Intents, Collection } = require("discord.js");

const bot = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

bot.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

const commands = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    console.log(command.data.name);
    bot.commands.set(command.data.name, command);
}

bot.once('ready', () => {
    console.log('Bot Online!');

    const CLIENT_ID = bot.user.id;
    const rest = new REST({version: "9"}).setToken(process.env.TOKEN);

    (async () => {
        try {
            if(process.env.ENV === "production") {
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                });
                console.log("Comandos registrados.");
            } else {
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                    body: commands
                });
                console.log("Comandos registrados localmente.");
            }
        } catch (err) {
            if (err) console.error(err);
        }
    })();
});

//COMANDOS
bot.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const command = bot.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch(err) {
        if (err) console.error(err);
        await interaction.reply({
            content: "Ocorreu um erro",
            ephemeral: true
    });
    }
});

bot.login(process.env.TOKEN);