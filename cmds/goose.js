const { MessageEmbed } = require("discord.js");
const client = require('nekos.life');
const neko = new client();

module.exports = {
    name: 'goose',
    description: `Get goose picture`,
    options: [],
    run: async(client, slash)=>{
        try {

            neko.goose().then(gif => slash.reply({
                embeds: [
                    new MessageEmbed().setDescription(`${slash.user} has a goose!`)
                    .setImage(gif.url)
                ]
            }));

        } catch (error) {
            console.log(error);
        }
    }
}