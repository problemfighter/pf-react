import PFHTTCallback from "../processor/http/pf-http-callback";
import PFHTTRequest from "../processor/http/pf-http-request";


export enum SortDirection {
    ascending = 'asc',
    descending = 'desc'
}

export class PFLastCallData {
    public resumeableCallback?: PFHTTCallback;
    public request?: PFHTTRequest;
}

