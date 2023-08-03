class Message {
    public id: number = 0;
    public subject: string = "";
    public content: string = "";
    public timestamp: Date = new Date()

    clone() : Message {
        const newMessage = new Message()
        newMessage.id = this.id
        newMessage.subject = this.subject
        newMessage.content = this.content
        return newMessage
    }
}

interface MessageAction {
    action: string;
    messageId: number;
}

const EMPTY_MESSAGES : Message[] = []

export {Message, MessageAction, EMPTY_MESSAGES}