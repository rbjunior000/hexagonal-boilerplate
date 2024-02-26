export type GenericHttpError = {
  code: string
}

type DefaultErrorInput = {
  name: string
  code: number
  message: string
  metadata?: Record<string, unknown>
}

export class DefaultError extends Error { 
  code: number
  metadata?: DefaultErrorInput['metadata']

  constructor({ name, code, message, metadata }: DefaultErrorInput) {
    super(message)
    this.name = name
    this.code = code
    this.metadata = metadata
  }
}

export class AuthError extends DefaultError {
  constructor(message = 'Unauthorized', metadata?: DefaultErrorInput['metadata']) {
    super({ name: 'AuthError', code: 401, message, metadata })
  }
}

export class ForbiddenError extends DefaultError {
  constructor(message: string, metadata?: DefaultErrorInput['metadata']) {
    super({ name: 'ForbiddenError', code: 403, message, metadata })
  }
}

export class BadRequestError extends DefaultError {
  constructor(message: string, metadata?: DefaultErrorInput['metadata']) {
    super({ name: 'BadRequestError', code: 400, message, metadata })
  }
}

export class NotFoundError extends DefaultError {
  constructor(message: string, metadata?: DefaultErrorInput['metadata']) {
    super({ name: 'NotFoundError', code: 404, message, metadata })
  }
}

export class ConflictError extends DefaultError {
  constructor(message: string, metadata?: DefaultErrorInput['metadata']) {
    super({ name: 'ConflictError', code: 409, message, metadata })
  }
}

export class ValidationError extends DefaultError {
  constructor(message: string, metadata?: DefaultErrorInput['metadata']) {
    super({ name: 'ValidationError', code: 400, message, metadata })
  }
}

export class UnknownError extends DefaultError {
  constructor() {
    super({ name: 'UnknownError', code: 418, message: 'Unknown error' })
  }
}

export class InternalServerError extends DefaultError {
  constructor(message: string) {
    super({ name: 'InternalServerError', code: 500, message })
  }
}