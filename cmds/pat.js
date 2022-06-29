const { MessageEmbed } = require("discord.js");
const client = require('nekos.life');
const neko = new client();

module.exports = {
    name: 'pat',
    description: `To pat a someone`,
    options: [
        {
            name: 'member',
            description: 'Member',
            type: 6,
            required: true
        }
    ],
    run: async(client, slash)=>{
        try {

            const member = await slash.options.getUser('member');

            neko.pat().then(gif => slash.reply({
                embeds: [
                    new MessageEmbed().setDescription(`${slash.user} pat ${member}`)
                    .setImage(gif.url)
                ]
            }));

        } catch (error) {
            console.log(error);
        }
    }
}