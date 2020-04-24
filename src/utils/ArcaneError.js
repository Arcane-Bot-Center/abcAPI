function ArcaneError(message,errCode) {
    this.name = this.constructor.name;
    this.message = message;
    this.code = errCode ? errCode : 'unknown';
    Error.captureStackTrace(this, this.message)
}

module.exports = {
    ArcaneError
}