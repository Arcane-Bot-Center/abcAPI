function ArcaneError(message,errCode,error) {
    this.name = this.constructor.name;
    this.message = message;
    this.code = errCode ? errCode : 'unknown';
    Error.captureStackTrace(this, this.message)
}


module.exports = {
    ArcaneError
}