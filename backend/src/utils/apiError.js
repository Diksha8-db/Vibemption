class ApiError extends Error{
    // constructor
    constructor(
        statusCode,
        errorMessage = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(errorMessage)
        this.statusCode = statusCode
        this.errors = errors

        // to capture the stack trace or erro we use this stack
        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}