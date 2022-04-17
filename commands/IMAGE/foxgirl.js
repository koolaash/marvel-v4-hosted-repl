const superagent = require("snekfetch"),
    Discord = require("discord.js");

module.exports = {
    name: "foxgirl",
    category: "Image",
    description: "Sends a random image of a foxgirl",
    usage: "foxgirl",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        
        superagent
            .get("https://nekos.life/api/v2/img/foxGirl")
            .end((err, response) => {
                const lewdembed = new Discord.MessageEmbed()
                    .setTitle("Random Foxgirl")
                    .setImage(response.body.url)
                    .setColor(client.embed.cm)
                    .setFooter({
                        text: `Foxgirl Here Give me a kiss!`,
                        iconURL: message.author.displayAvatarURL({ dynamic: true })
                    })
                    .setURL(response.body.url);
                message.reply({ embeds: [lewdembed] });
            });
    }
};