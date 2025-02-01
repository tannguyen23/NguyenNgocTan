export class NotFoundException extends Error {
  constructor(message: string = "Resource not found") {
    super(message);
    this.name = "NotFoundException";
  }
}

export class BadRequestException extends Error {
  constructor(message: string = "Bad request") {
    super(message);
    this.name = "BadRequestException";
  }
}

export class InternalServerException extends Error {
  constructor(message: string = "Internal server error") {
    super(message);
    this.name = "InternalServerException";
  }
}
