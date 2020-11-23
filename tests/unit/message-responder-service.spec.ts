import 'reflect-metadata';
import 'mocha';
import { expect } from 'chai';
import { instance, mock, verify, when } from 'ts-mockito';

import { Message } from 'discord.js';
import { MessageResponder } from '../../src/bot/services/message-responder-service';
import { RobloxQueueService } from '../../src/bot/services/roblox-queue-service';
import { RobloxGameBuilderService } from '../../src/bot/services/roblox-game-builder-service';

describe('MessageResponder', () => {
    mockMessageResponderInstance: MessageResponder;
    mockMessageClass: Message;
    mockMessageInstance: Message;

    

    beforeEach(() => {
        let mockMessageResponderInstance = mock(MessageResponder);
        let mockRobloxQueueService = mock(RobloxQueueService);
        let mockRobloxGameBuilderService = mock(RobloxGameBuilderService);
        let mockMessageClass = mock(Message);
        let mockMessageInstance = instance(Message);
        setMessageContents();

        mockRobloxGameBuilderService = new RobloxGameBuilderService();
        mockRobloxQueueService = new RobloxQueueService(mockRobloxGameBuilderService);
        mockMessageResponderInstance = new MessageResponder(mockRobloxQueueService);
    })

    it('should reply', async () => {

    })

    it('should not reply', async () => {

    })

    function setMessageContents() {

    }

    function whenMentionedThenReturn(res: boolean) {
        
    }

});