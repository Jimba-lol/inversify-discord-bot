import 'reflect-metadata';
import 'mocha';
import { expect } from 'chai';
import { instance, mock, verify, when } from 'ts-mockito';

import { Message } from 'discord.js';
import { MessageResponder } from '../../src/bot/services/message-responder-service';

describe('MessageResponder', () => {
    mockMessageResponderInstance: MessageResponder;
    mockMessageClass: Message;
    mockMessageInstance: Message;

    

    beforeEach(() => {
        let mockMessageResponderInstance = mock(MessageResponder);
        let mockMessageClass = mock(Message);
        let mockMessageInstance = instance(Message);
        setMessageContents();

        mockMessageResponderInstance = new MessageResponder();
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