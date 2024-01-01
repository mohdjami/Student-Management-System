class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  status: any;
  code: number | undefined;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
