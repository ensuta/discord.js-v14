import { SlashCommandBuilder } from '@discordjs/builders';

const registerCommand = new SlashCommandBuilder()
  .setName('register')
  .setDescription('register cmd')

export default registerCommand.toJSON();