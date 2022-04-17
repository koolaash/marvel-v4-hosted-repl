const superagent = require("snekfetch"),
    Discord = require("discord.js");

module.exports = {
    name: "dog",
    category: "FUN",
    description: "Sends a random image of a cat",
    usage: "dog",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {
        //command
        superagent
            .get("https://nekos.life/api/v2/img/woof")
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