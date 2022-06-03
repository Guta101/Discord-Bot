const { GuildMember } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');



function enterVoiceChannel(interaction) {
    if (interaction.member instanceof GuildMember && interaction.member.voice.channel) {
        const channel = interaction.member.voice.channel;

        connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
    }
}

function playAudio(interaction, fileName) {
        enterVoiceChannel(interaction);
        
        const player = createAudioPlayer();
        const resource = createAudioResource(`./sons/${fileName}.mp3`);

        const subscription = connection.subscribe(player);
        player.play(resource);

        if (subscription)
            setTimeout(() => subscription.unsubscribe(), 10_000);

        interaction.reply({
            content: "\:sunglasses:",
            ephemeral: true
        });
}

//SONOPLASTIA DE AUDITÓRIO
module.exports = {
    data: new SlashCommandBuilder()
        .setName("v")
        .setDescription("Toca a vinheta")
        .addStringOption(option =>
            option.setName('vinheta')
            .setDescription('Escolha uma vinheta')
            .setRequired(true)
            .addChoice('Dança gatinho', 'dancagatinho')
            .addChoice('BRASIL', 'brasil')
            .addChoice('Calma', 'calma')
            .addChoice('Cavalo', 'cavalo')
            ),
        
    
    async execute(interaction) {
        console.log(interaction.options.getString('vinheta'))
        playAudio(interaction, interaction.options.getString('vinheta'));
    }
}
