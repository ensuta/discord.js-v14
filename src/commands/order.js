import { SlashCommandBuilder } from "@discordjs/builders";

const orderCommand = new SlashCommandBuilder()
        .setName('order')
        .setDescription('Order Somethings')
//         .addStringOption((option) => 
//         option
//         .setName('food')
//         .setDescription('the type of food')
//         .setRequired(true)
//         .setChoices(
//             {
//                 name: 'Hamburger',
//                 value: 'hamburger',
//             },
//             {
//                 name: "Cake",
//                 value: 'cake',
//             },
//             {
//                 name: "Chicken",
//                 value: 'chicken',
//             },
//           )
//         ).addStringOption((option) => 
//             option
//                 .setName('drink')
//                 .setDescription('the type of drink')
//                 .setRequired(true)
//                 .setChoices(
//                     {
//                         name: 'Water',
//                         value: 'water',
//                     },
//                     {
//                         name: 'Coca-Cola',
//                         value: 'coca-cola',
//                     },
//                     {
//                         name: 'Sprite',
//                         value: 'sprite',
//                     },
//             )
//         );

       

export default orderCommand.toJSON();