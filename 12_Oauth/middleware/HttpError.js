class httpError extends Error {
    constructor(message,statusCode){
        super.statusCode;
        this.statusCode = statusCode;
    }
}
export default httpError;