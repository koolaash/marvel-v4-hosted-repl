const superagent = require("snekfetch"),
    Discord = require("discord.js");

module.exports = {
    name: "lizard",
    category: "Image",
    description: "Sends a random image of a lizard",
    usage: "lizard",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {

        superagent
            .get("https://nekos.life/api/v2/img/lizard")
            .end((err, response) => {
                const lewdembed = new Discord.MessageEmbed()
                    .setTitle("Random Lizard")
                    .setImage(response.body.url)
                    .setColor(client.embed.cm)
                    .setFooter({
                        text: message.author.tag,
                        iconURL: message.author.displayAvatarURL({ dynamic: true })
                    })
                    .setURL(response.body.url);
                message.reply({ embeds: [lewdembed] });
            });
    }
};