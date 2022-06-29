const { Client, Intents, Collection } = require("discord.js");
const client = new Client({ intents: [ Intents.FLAGS.GUILDS ] });

const config = require("config"), fs = require("fs");
const cmdsDir = config.get("cmdsDir");


client.slashes = new Collection();
let slash = [];

client.on('ready', ()=>{
    client.user.setStatus('dnd');
    client.user.setPresence({ activities: [{ name: 'https://github.com/NikKeY7/LeeJerry-bot' }], status: 'idle' });

    console.log(`Бот ${client.user.tag} запущен!`);
    const commands = fs.readdirSync(`./${cmdsDir}/`).filter(file => file.endsWith(".js"));
    for (let file of commands) {
        let props = require(`./${cmdsDir}/${file}`);
        slash.push({
            name: props.name,
            description: props.description,
            options: props.options
        });
        client.slashes.set(props.name, props);
    }

    (async()=>{
        try {
            await client.application.commands.set(slash, config.get("guild"));
        } catch (error) {
            console.log(error);
        }
    })();
});

/* client.on('guildMemberAdd', (member)=>{
    if(member.user.bot) return;

}); */

client.on('interactionCreate', (interaction)=>{
    if(!interaction.isCommand()) return;

    let cmd = client.slashes.get(interaction.commandName);
    if(cmd) cmd.run(client, interaction);
});

client.login(config.get('token'));
