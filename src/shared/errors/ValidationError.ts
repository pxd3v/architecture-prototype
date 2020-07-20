class ValidationError {
    public readonly messages: string[];

    public readonly statusCode: number;

    constructor(messages: string[]) {
        this.messages = messages;
        this.statusCode = 400;
    }
}

export default ValidationError;