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

        let role = await message.mentions.roles.first() || await message.guild.roles.cache.find(r => r.id === args[0])
            || await message.guild.roles.cache.find(r => r.name === args.join(" "))


        const embed = new discord.MessageEmbed({
            color: role.hexColor || client.embed.cm,
            title: `${role.name}'s Information`,
            description: `**Role ID : **${role.id}\n` +
                `**Role Mentionable : **${role.mentionable ? 'Yes' : 'No'}\n` +
                `**Role Color : **${role.hexColor || 'Default'}\n` +
                `**Role Display Saperately : **${role.hoist ? 'Yes' : 'No'}\n` +
                `**Role Position : **${role.position}\n` +
                `**Role Members : **${role.members.size || '0'}\n` +
                `**Role Permissions : **\n\`${role.permissions.toArray().join("', '") || "None"}\`\n` +
                `**Members : **Use dump command to check members!`,
            thumbnail: message.guild.iconURL({ dynamic: true })
        })
        return message.reply({ embeds: [embed] });
    }
};
