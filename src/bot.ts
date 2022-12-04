import { inject, injectable } from 'inversify';
import { SYMBOLS } from './symbols';

import { Client, Message, Interaction, ActivitiesOptions } from 'discord.js';

import { MessageService } from './service/message-service';
import { InteractionService } from './service/interaction-service';

@injectable()
export class Bot {
  private client: Client;
  private readonly token: string;
  private interactionService: InteractionService;
  private messageService: MessageService;

  private presences: Array<ActivitiesOptions> = [
    {name: 'YOU', type: 'WATCHING'},
    {name: '👁👃👁', type: 'WATCHING'},
    {name: '👁👁', type: 'WATCHING'},
    {name: '👀', type: 'WATCHING'},
    {name: '🗿', type: 'WATCHING'},
    {name: 'to YOU', type: 'LISTENING'},
    {name: '👂', type: 'LISTENING'},
    {name: '🎧', type: 'LISTENING'},
    {name: 'myself', type: 'PLAYING'},
    {name: 'with myself', type: 'PLAYING'}
  ];

  constructor(
    @inject(SYMBOLS.Client) client: Client,
    @inject(SYMBOLS.Token) token: string,
    @inject(SYMBOLS.InteractionService) interactionService: InteractionService,
    @inject(SYMBOLS.MessageService) messageService: MessageService,
  ) {
    this.client = client;
    this.token = token;
    this.interactionService = interactionService;
    this.messageService = messageService;
  }

  public listen(): Promise<string> {
    this.client.on('messageCreate', (message: Message) => {
      if (message.author.bot) { return; }
      this.messageService.handleMessage(message);
    });
    this.client.on('interactionCreate', (interaction: Interaction) => {
      this.interactionService.handleInteraction(interaction);
      this.randomizePresence();
    });
    this.client.on('ready', () => {
      this.randomizePresence();
    });
    return this.client.login(this.token);
  }

  private randomizePresence(): void {
    this.client.user!.setPresence({
      status: 'online',
      activities: [
        this.presences[Math.floor(Math.random() * this.presences.length)],
      ]
    });
  }
}