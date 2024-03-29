require('dotenv').config();
import container from './inversify.config';
import { SYMBOLS } from './symbols';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, ContextMenuCommandInteraction, Snowflake } from 'discord.js';
import { ChatCommandService } from './service/chat-command-service';
import { Bot } from './bot';
import { Token } from 'typescript';
import { ContextMenuService } from './service/context-menu-service';

let bot = container.get<Bot>(SYMBOLS.Bot);
let client = container.get<Client>(SYMBOLS.Client);
let token = container.get<string>(SYMBOLS.Token);
let chatCommandService = container.get<ChatCommandService>(SYMBOLS.ChatCommandService);
let contextService = container.get<ContextMenuService>(SYMBOLS.ContextMenuService);
const commandData: any[] = chatCommandService.getChatCommands().map((command) => command.data.toJSON());
const contextData = contextService.getContextInteractions().map((interaction) => interaction.data.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

bot.listen().then(() => {
  client.guilds.fetch().then(guilds => {
    const key = guilds.firstKey(); // temporary
    rest.put(
      Routes.applicationGuildCommands(client!.user!.id, key!),
      { body: commandData.concat(contextData) }
    ).then(() => {
      console.log("Commands have been registered.");
      process.exit();
    }).catch((e) => console.log(e));
  }).catch((e) => console.log(e));
}).catch((e) => console.log(e));
