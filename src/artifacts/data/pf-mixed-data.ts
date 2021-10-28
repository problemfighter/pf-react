import PFHTTCallback from "../processor/http/pf-http-callback";
import PFHTTRequest from "../processor/http/pf-http-request";


export enum SortDirection {
    ascending = 'asc',
    descending = 'desc'
}

export class PFLastCallData {
    public resumeAbleCallback?: PFHTTCallback;

    public resumeableCallback?: PFHTTCallback;
    public request?: PFHTTRequest;
}


export interface HTTPLastCalledData {
    resumeAbleCallback?: PFHTTCallback;
    request?: PFHTTRequest;
}