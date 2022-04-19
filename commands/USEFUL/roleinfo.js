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
        await message.guild.members.fetch()
        let roles = await message.guild.roles.fetch()

        let role = message.mentions.roles.first() || roles.find(r => r.id === args[0])
            || roles.find(r => r.name === args.join(" ")),
            embed = new discord.MessageEmbed({
                color: role.hexColor || client.embed.cm,
                title: `${role.name}'s Information`,

            })
                .addField(`Role ID`, role.id, true)
                .addField(`Role Mentionable`, role.mentionable ? 'Yes' : 'No', true)
                .addField(`Role Color`, role.hexColor || 'Default', true)
                .addField(`Role Display Saperately`, role.hoist ? 'Yes' : 'No', true)
                //   .addField(`Role Position`, role.position)
                .addField(`Role Members`, role.members.size || '0')
                //   .addField(`Members`, role.members.map(m => m) || "None")
                .addField(`Role Permissions`, `\`${role.permissions.toArray().join("', '") || "None"}\``)

        let icon = role.iconURL
        if (icon !== null) {
            embed.setThumbnail(icon)
        } else {
            embed.setThumbnail(message.guild.iconURL({ dynamic: true }))
        }
        message.reply({ embeds: [embed] });
        console.log(`${role.position}`)
    }
};
