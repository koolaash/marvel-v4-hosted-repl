const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "kick",
    aliases: ["kickuser"],
    desciption: "helps you kick a user",
    category: "MODERATION",
    usage: "kick <@user | username | userid> [reason]",
    userPermissions: ["BAN_MEMBERS"],
    botPermissions: ["EMBED_LINKS", "BAN_MEMBERS"],

    async run(client, message, args) {
        try {
            if (!args[0]) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: client.emoji.fail + "| **Mention a user or provide id/name!**",
                            color: client.embed.cf
                        })
                    ]
                });
            }

            let kickMember =
                message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]) ||
                message.guild.members.cache.find(
                    r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
                ) ||
                message.guild.members.cache.find(
                    ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
                )

            if (!kickMember || kickMember === undefined) {
                try {
                    kickMember = await message.guild.members.fetch(args[0]);
                } catch (e) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed({
                                description: client.emoji.fail + "| **Cannot find this user!**",
                                color: client.embed.cf
                            })
                        ]
                    })
                }
            }

            if (!kickMember) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: client.emoji.fail + "| **Cannot find this user!**",
                            color: client.embed.cf
                        })
                    ]
                })
            }

            if (kickMember.id === message.member.id) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: client.emoji.fail + "| **Cannot kick yourself!**",
                            color: client.embed.cf
                        })
                    ]
                })
            }
            if (!client.config.bowner.includes(message.author.id)) {
                if (message.member !== message.guild.owner) {
                    if (message.member.roles.highest.position <= kickMember.roles.highest.position) {
                        return message.reply({
                            embeds: [
                                new discord.MessageEmbed({
                                    description:
                                        client.emoji.fail + "| Your Role isn't High Enough to kick **``" +
                                        kickMember.user.tag + "``**",
                                    color: client.color.cf
                                })
                            ]
                        })
                    }
                }
            }

            if (
                message.guild.me.roles.highest.position <=
                kickMember.roles.highest.position
            ) {
                return message.reply({
                    embeds: [
                        new discord.MessageEmbed({
                            description:
                                client.emoji.fail + "| My Role isn't High Enough to kick **``" +
                                kickMember.user.tag + "``**",
                            color: client.color.cf
                        })
                    ]
                })
            }
            if (client.config.bowner.includes(kickMember.id)) {
                return message.reply({
                    embeds: [
                        new MessageEmbed({
                            description: client.emoji.fail + "| **Cannot kick this user because he is my owner!**",
                            color: client.embed.cf
                        })
                    ]
                })
            }
            var av = kickMember.user.displayAvatarURL({ dynamic: true }),
                reason = args.slice(1).join(" ");

            try {
                kickMember.kick({
                    reason: message.author.tag + ` ${reason || " No Reason Provided"}`
                });
            } catch (err) {
                kickMember.kick({
                    reason: message.author.tag + ` ${reason || " No Reason Provided"}`
                });
            }

            var sembed = new MessageEmbed()
                .setColor(client.embed.cr)
                .setTitle("Kicked")
                .setImage(av)
                .setDescription(
                    `**${client.emoji.success}| ${kickMember.user.username}** has been kicked for ${reason || " No Reason Provided"}`
                )
                .setFooter({
                    text: "Kicked By : " + message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                });
            return message.reply({ embeds: [sembed] });
        } catch (e) {
            var sd = new MessageEmbed()
                .setColor(client.embed.cr)
                .setDescription(`**${e.message}**`)
            return message.reply({ embeds: [sd] });
        }
    }
};
