import PFHTTCallback from "./pf-http-callback";
import PFHTTRequest from "./pf-http-request";

export default interface PfHttpManager {
    postJSON(request: PFHTTRequest, callback: PFHTTCallback) : void;
    post(request: PFHTTRequest, callback: PFHTTCallback) : void;
    get(request: PFHTTRequest, callback: PFHTTCallback) : void;
    deleteJSON(request: PFHTTRequest, callback: PFHTTCallback) : void;
    delete(request: PFHTTRequest, callback: PFHTTCallback) : void;
    putJSON(request: PFHTTRequest, callback: PFHTTCallback) : void;
    put(request: PFHTTRequest, callback: PFHTTCallback) : void;
}