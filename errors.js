export class WrongEmailError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name;
        this.status = 400;
    }
} 
