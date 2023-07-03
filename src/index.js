import { Client, GatewayIntentBits, Routes } from "discord.js";
import { config } from 'dotenv';
import { REST } from '@discordjs/rest';
import { SlashCommandBuilder } from "@discordjs/builders";

config();

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const rest = new REST({version: 10,}).setToken(TOKEN);

client.login(TOKEN)

client.on('ready', () => console.log(`${client.user.tag} has logged in!`));

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        const food = interaction.options.get('food').value;
        const drink = interaction.options.get('drink').value;
         
        interaction.reply({
            content: `You oredered ${food} and ${drink}`
        });
    }
});

async function main() {

    const orederCommand = new SlashCommandBuilder()
        .setName('order')
        .setDescription('Order Somethings')
        .addStringOption((option) => 
        option
        .setName('food')
        .setDescription('the type of food')
        .setRequired(true)
        .setChoices(
            {
                name: 'Hamburger',
                value: 'hamburger',
            },
            {
                name: "Cake",
                value: 'cake',
            },
            {
                name: "Chicken",
                value: 'chicken',
            },
          )
        ).addStringOption((option) => 
            option
                .setName('drink')
                .setDescription('the type of drink')
                .setRequired(true)
                .setChoices(
                    {
                        name: 'Water',
                        value: 'water',
                    },
                    {
                        name: 'Coca-Cola',
                        value: 'coca-cola',
                    },
                    {
                        name: 'Sprite',
                        value: 'sprite',
                    },
            )
        );

        console.log(orederCommand.toJSON());
        const commands = [orederCommand.toJSON()];
        try {
            console.log('/ commands');
            await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
                body: commands,
            });
        } catch (err) {
            console.log(err);
        }
}

main();