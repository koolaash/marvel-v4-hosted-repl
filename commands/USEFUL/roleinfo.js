const discord = require("discord.js");

module.exports = {
    name: "roleinfo",
    aliases: ['ri'],
    desciption: "shows the information about a role of a guild",
    category: "USEFUL",
    usage: "roleinfi @role/role_id",
    userPermissions: [],
    botPermissions: ["EMBED_LINKS"],

    async run(client, message, args) {

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
            || message.guild.roles.cache.find(r => r.name === args.join(" "))

        const embed = new discord.MessageEmbed({
            color: client.embed.cm,
            title: `${role.name}'s Information`,

        })
            .addField(`Role ID`, role.id, true)
            .addField(`Role Mentionable`, role.mentionable ? 'Yes' : 'No', true)
            .addField(`Role Color`, role.hexColor || 'Default', true)
            //  .addField(`Role Members`, role.members || "0", true)
            .addField(`Role Permissions`, `\`${role.permissions.toArray().join("', '") || "None"}\``)
        let icon = role.icon
        if (icon !== null) {
            embed.setThumbnail(icon)
        }
        message.reply({ embeds: [embed] });
    }
};
