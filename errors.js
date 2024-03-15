export class WrongEmailError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name;
        this.status = 400;
    }
} 

export class AlreadyExistingEmailError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name;
        this.status = 409;
    }
}

export class UserNotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name;
        this.status = 404;
    }
}

export class InvalidPasswordError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name;
        this.status = 401;
    }
}

export class MissingTokenError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name;
        this.status = 403;
    }
}

export class InvalidTokenError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name;
        this.status = 401;
    }
}