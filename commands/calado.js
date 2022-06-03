require("dotenv").config()
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calado')
        .setDescription("Comando feito especificamente para mutar o Judeu"),
    execute(message, args) {
        async function funca(message, args){
            var judeu = message.guild.members.cache.get(process.env.JUDEU_ID);
            await judeu.voice.setMute(true, 'noen').then(console.log).catch(console.error);
        }
        funca(message, args).catch(console.log);
        }
    }
