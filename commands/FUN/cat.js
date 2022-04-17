const superagent = require("snekfetch"),
    Discord = require("discord.js");

module.exports = {
    name: "cat",
    category: "FUN",
    description: "Sends a random image of a cat",
    usage: "cat",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        //command
        superagent
            .get("https://nekos.life/api/v2/img/meow")
            .end((err, response) => {
                const lewdembed = new Discord.MessageEmbed()
                    .setTitle("Random Dat")
                    .setImage(response.body.url)
                    .setColor(client.embed.cm)
                    .setFooter({
                        text: `CUTE CAT`,
                        iconURL: message.author.displayAvatarURL({ dynamic: true })
                    })
                    .setURL(response.body.url);
                message.reply({ embeds: [lewdembed] });
            });
    }
};