import { IMessage } from '../interfaces/chat.interface';

export default class MessagesDatabase {
    private static instance: MessagesDatabase;
    private messages: IMessage[];

    public constructor() {
        this.messages = [];
    }

    static getInstance() {
        if (!MessagesDatabase.instance) {
            MessagesDatabase.instance = new MessagesDatabase();
        }
        return MessagesDatabase.instance;
    }
    reset() {
        this.messages = [];
    }

    addMessage(message: IMessage) {
        // Verifique se o valor de timestamp já é um objeto Date
        if (typeof message.timestamp === 'string') {
            // Se for uma string, converta-a para um objeto Date
            message.timestamp = new Date(message.timestamp);
        }
        this.messages.push(message);
    }

    deleteMessage(id: string) {
        const index = this.messages.findIndex(message => message.id === id);
        if (index !== -1) {
            this.messages.splice(index, 1);
            return true;
        }
        return false;
    }
    
    getConversation(participant1: string, participant2: string) {
        return this.messages.filter(message =>
            (message.sender === participant1 && message.receiver === participant2) ||
            (message.sender === participant2 && message.receiver === participant1)
        );
    }
    getMediaConversation(participant1: string, participant2: string) {
        return this.messages.filter(message =>
            ((message.sender === participant1 && message.receiver === participant2) ||
            (message.sender === participant2 && message.receiver === participant1)) && message.media === true
        );
    }

    getMessage(id: string): IMessage | undefined {
        return this.messages.find(message => message.id === id);
    }

}
