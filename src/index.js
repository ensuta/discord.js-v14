import { Client, GatewayIntentBits, Routes } from "discord.js";
import { config } from 'dotenv';
import { REST } from '@discordjs/rest';
import OrderCommand from './commands/order.js';
import RolesCommand from './commands/role.js';
import UserCommand from './commands/user.js';
import ChanneCommand from "./commands/channel.js";
import BanCommand from './commands/ban.js';
import { ActionRowBuilder, SelectMenuBuilder } from "@discordjs/builders";


config();

const client = new Client({ 
    intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
    ],
});
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const rest = new REST({version: 10,}).setToken(TOKEN);

client.on('ready', () => console.log(`${client.user.tag} has logged in!`));

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'order') {
            console.log('Order Command');
            console.log(interaction);
            const actionRowComponent = new ActionRowBuilder().setComponents(
                    new SelectMenuBuilder()
                        .setCustomId('food_options')
                        .setOptions([
                            {label: 'Cake', value: 'cake'}, 
                            {label: 'Pizza', value: 'pizza'},
                            {label: 'Sushi', value: 'sushi'},
                        ])
                );
            interaction.reply({
                components: [actionRowComponent.toJSON()],
            });
        }
    }
});

async function main() {
    
    const commands = [
        OrderCommand, 
        RolesCommand, 
        UserCommand, 
        ChanneCommand,
        BanCommand,
        
    ];
    try {
        console.log('/ commands');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });
        client.login(TOKEN)
    } catch (err) {
        console.log(err);
    }
}

main();