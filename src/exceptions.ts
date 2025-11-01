/**
 * Base exception for all WAHA client errors
 */
export class WahaException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WahaException';
    Object.setPrototypeOf(this, WahaException.prototype);
  }
}

/**
 * Raised when authentication fails
 */
export class WahaAuthenticationException extends WahaException {
  constructor(message: string = 'Authentication failed') {
    super(message);
    this.name = 'WahaAuthenticationException';
    Object.setPrototypeOf(this, WahaAuthenticationException.prototype);
  }
}

/**
 * Raised when session operation fails
 */
export class WahaSessionException extends WahaException {
  constructor(message: string = 'Session operation failed') {
    super(message);
    this.name = 'WahaSessionException';
    Object.setPrototypeOf(this, WahaSessionException.prototype);
  }
}

/**
 * Raised when a resource is not found
 */
export class WahaNotFoundException extends WahaException {
  constructor(message: string = 'Resource not found') {
    super(message);
    this.name = 'WahaNotFoundException';
    Object.setPrototypeOf(this, WahaNotFoundException.prototype);
  }
}

/**
 * Raised when rate limit is exceeded
 */
export class WahaRateLimitException extends WahaException {
  constructor(message: string = 'Rate limit exceeded') {
    super(message);
    this.name = 'WahaRateLimitException';
    Object.setPrototypeOf(this, WahaRateLimitException.prototype);
  }
}

/**
 * Raised when server returns an error
 */
export class WahaServerException extends WahaException {
  constructor(message: string = 'Server error') {
    super(message);
    this.name = 'WahaServerException';
    Object.setPrototypeOf(this, WahaServerException.prototype);
  }
}

