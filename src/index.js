import { config } from 'dotenv';
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Client,
    GatewayIntentBits,
    InteractionType,
    ModalBuilder,
    Routes,
    StringSelectMenuBuilder,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js';
import { REST } from '@discordjs/rest';
import OrderCommand from './commands/order.js';
import RolesCommand from './commands/role.js';
import UsersCommand from './commands/user.js';
import ChannelsCommand from './commands/channel.js';
import BanCommand from './commands/ban.js';
import RegisterCommand from './commands/register.js';
import ButtonCommand from './commands/button.js';

config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => console.log(`${client.user.tag} has logged in!`));

client.on('messageCreate', (m) => {
    if (m.author.bot) return;

    m.channel.send({
        content: 'Hello, World!',
        components: [
            new ActionRowBuilder().setComponents(
                new ButtonBuilder()
                    .setCustomId('button1')
                    .setLabel('button 1')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('button2')
                    .setLabel('button 2')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setLabel('button 3')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://google.com/')
            ),
        ],
    });
});

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        console.log('Chat Command');
        if (interaction.commandName === 'order') {
            const actionRowComponent = new ActionRowBuilder().setComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('drink_options')
                    .setOptions([
                        { label: 'Cake', value: 'cake' },
                        { label: 'Pizza', value: 'pizza' },
                        { label: 'Sushi', value: 'sushi' },
                    ])
            );
            interaction.reply({
                components: [actionRowComponent.toJSON()],
            });
        } else if (interaction.commandName === 'register') {
            const modal = new ModalBuilder()
                .setTitle('Register User Form')
                .setCustomId('registerUserModal')
                .setComponents(
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('username')
                            .setCustomId('username')
                            .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('email')
                            .setCustomId('email')
                            .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('comment')
                            .setCustomId('comment')
                            .setStyle(TextInputStyle.Paragraph)
                    )
                );

            interaction.showModal(modal);
        } else if (interaction.commandName === 'button') {
            interaction.reply({
                content: 'Button',
                components: [
                    new ActionRowBuilder().setComponents(
                        new ButtonBuilder()
                            .setCustomId('button1')
                            .setLabel('button 1')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('button2')
                            .setLabel('button 2')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel('button 3')
                            .setStyle(ButtonStyle.Link)
                            .setURL('https://google.com/')
                    ),
                ]
            });
        }
    } else if (interaction.isAnySelectMenu()) {
        console.log('Select Menu');
        if (interaction.customId === 'food_options') {
            console.log(interaction.component);
        } else if (interaction.customId === 'drink_options') {
        }
    } else if (interaction.type === InteractionType.ModalSubmit) {
        console.log('Modal Submitted...');
        if (interaction.customId === 'registerUserModal') {
            console.log(interaction.fields.getTextInputValue('username'));
            interaction.reply({
                content: 'You successfully submitted your details!',
            });
        }
    }
});

async function main() {
    const commands = [
        OrderCommand,
        RolesCommand,
        UsersCommand,
        ChannelsCommand,
        BanCommand,
        RegisterCommand,
        ButtonCommand,
    ];
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });
        client.login(TOKEN);
    } catch (err) {
        console.log(err);
    }
}

main();
