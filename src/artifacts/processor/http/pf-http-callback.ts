import PFHTTResponse from "./pf-http-response";

export default interface PFHTTCallback {
    before(response: PFHTTResponse): void;
    success(response: PFHTTResponse): void;
    failed(response: PFHTTResponse): void;
    finally(): void;
}