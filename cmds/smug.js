const { MessageEmbed } = require("discord.js");
const client = require('nekos.life');
const neko = new client();

module.exports = {
    name: 'smug',
    description: `To smug`,
    options: [],
    run: async(client, slash)=>{
        try {

            neko.smug().then(gif => slash.reply({
                embeds: [
                    new MessageEmbed().setDescription(`${slash.user} smugy..`)
                    .setImage(gif.url)
                ]
            }));

        } catch (error) {
            console.log(error);
        }
    }
}