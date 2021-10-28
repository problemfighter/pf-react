import PFHTTCallback from "../processor/http/pf-http-callback";
import PFHTTRequest from "../processor/http/pf-http-request";


export enum SortDirection {
    ascending = 'asc',
    descending = 'desc'
}

export interface HTTPLastCalledData {
    resumeAbleCallback?: PFHTTCallback;
    request?: PFHTTRequest;
}