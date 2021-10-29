export class PFException extends Error {

    errorDetails?: any

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'PfException';
    }

    public setErrorDetails(details: any): PFException {
        this.errorDetails = details
        return this;
    }

}