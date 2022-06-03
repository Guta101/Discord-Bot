require("dotenv").config()
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fale')
        .setDescription("Comando feito especificamente para desmutar o Judeu"),
    execute(message, args) {
        async function funca(message, args) {
            if (message.member.id === process.env.JUDEU_ID) {
                message.channel.send('Não.');
            } else {
                var judeu = message.guild.members.cache.get(process.env.JUDEU_ID);
                await judeu.voice.setMute(false, 'noen').then(console.log).catch(console.error);
            }
        }
        funca(message, args).catch(console.log);
    }
}
