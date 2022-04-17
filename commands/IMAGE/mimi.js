const superagent = require("snekfetch"),
    Discord = require("discord.js");

module.exports = {
    name: "mimi",
    category: "Image",
    description: "Sends a random image of a mimi",
    usage: "mimi",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {

        superagent
            .get("https://nekos.life/api/v2/img/kemonomimi")
            .end((err, response) => {
                const lewdembed = new Discord.MessageEmbed()
                    .setTitle("Random Mimi")
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