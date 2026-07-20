class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);

    // working
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);

    // working
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;