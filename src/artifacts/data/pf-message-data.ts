
export enum Status {
    SUCCESS = "success",
    FAILED = "error",
    success = "success",
    warning = "warning",
    error = "error",
    info = "info"
}

export class PFMessageData {

    public status: Status;
    public message: string;

    constructor(message: string, status:Status = Status.FAILED) {
        this.status = status;
        this.message = message;
    }

    public setMessage(message:string): PFMessageData {
        this.message = message;
        return this;
    }

    public setStatus(status:Status): PFMessageData {
        this.status = status;
        return this;
    }

    public static success(message: string) {
        return new PFMessageData(message).setStatus(Status.SUCCESS);
    }


    public static failed(message: string) {
        return new PFMessageData(message).setStatus(Status.FAILED);
    }

}