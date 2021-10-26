import PFHTTResponse from "../processor/http/pf-http-response";
import {PFMessageData} from "../data/pf-message-data";
import PFAppConfig from "../config/pf-app-config";


export interface PFProps {
    appConfig?: PFAppConfig
    route?: any
}
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
