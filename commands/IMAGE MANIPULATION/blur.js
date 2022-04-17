const Discord = require("discord.js"),
    DIG = require("discord-image-generation"),
    nam = 'blur';

module.exports = {
    name: nam,
    category: "Image Manipilation",
    description: `Edits your image with ${nam}`,
    usage: `${nam} blur <amount> || \`${nam} blur <image_link> <amount>\``,
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    run: async (client, message, args) => {

        let img = message.author.displayAvatarURL({ size: 2048, format: 'png' }),
            amt = args[0];
        if (args[0] && isNaN(args[0])) {
            img = args[0]
            amt = args[1]
            if (!/\.(png)$/i.test(img)) {
                return message.reply({
                    embeds: [
                        new Discord.MessageEmbed({
                            description: `${client.emoji.fail}| Provide png format please!`,
                            color: client.embed.cf
                        })
                    ]
                })
            }
        }

        if (isNaN(amt)) {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed({
                        description: `${client.emoji.fail}| Provide a valid effect amount in numbers!`,
                        color: client.embed.cf
                    })
                ]
            })
        }

        let output = await new DIG.Blur().getImage(img, amt),
            attach = new Discord.MessageAttachment(output, "blur.png");
        message.reply({ files: [attach] });
    }
};