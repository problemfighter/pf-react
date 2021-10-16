import PFHTTResponse from "../processor/http/pf-http-response";
import {PFMessageData} from "../data/pf-message-data";


export interface PFProps {}
export interface PFState { }
export interface HTTPCallback { callback(response: PFHTTResponse): void; }
export interface PFPageManagerState extends PFState {}

export interface CustomValidation {
    validate(fieldName: string, value: any, formData: { [key: string]: any }): PFMessageData;
}

export interface PFHTTPCall {
    resume(): void;
    getComponent(): any;
}

export interface PFEvent {
    fire(event: any): void;
}
