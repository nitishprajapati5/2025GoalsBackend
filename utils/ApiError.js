// Custom error class for API-related errors
class ApiError extends Error {
    constructor(
      statusCode,
      message = "something went wrong", 
      errors = [],
      stack = "" 
    ) {
      super(message);
  
      this.statusCode = statusCode;
      this.data = null;
      this.message = message;
      this.success = false; 
      this.errors = errors;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }

    toJSON(){
      return {
        statusCode:this.statusCode,
        data : null,
        message : this.message,
        success : false,
        errors : this.errors
      }
    }
  }
  
  export { ApiError };