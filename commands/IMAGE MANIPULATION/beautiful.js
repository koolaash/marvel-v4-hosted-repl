const Discord = require("discord.js"),
    DIG = require("discord-image-generation"),
    nam = 'beautiful';

module.exports = {
    name: nam,
    category: "Image Manipilation",
    description: `Edits your image with ${nam}`,
    usage: `${nam} @user`,
    userPermissions: [],
    botPermissions: ["ATTACH_FILES"],

    run: async (client, message, args) => {
        let target = message.mentions.members.first() || message.author,
            mem = message.guild.members.cache.get(target.id),
            img = mem.user.displayAvatarURL({ size: 2048, format: 'png' }),
            output = await new DIG.Beautiful().getImage(img),
            attach = new Discord.MessageAttachment(output, "blur.png");
        return message.reply({ files: [attach] });
    }
};