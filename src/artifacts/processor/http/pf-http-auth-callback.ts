import PFHTTRequest from "./pf-http-request";

export default interface PFHTTAuthCallback {
    process(request: PFHTTRequest): PFHTTRequest;
}