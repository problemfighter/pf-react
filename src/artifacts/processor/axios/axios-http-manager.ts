import PFHTTPManager from "../http/pf-http-manager";
import PFHTTRequest from "../http/pf-http-request";
import PFHTTCallback from "../http/pf-http-callback";
import axios, {AxiosError, AxiosResponse} from 'axios';
import {PFHTTPConst} from "../http/pf-http-const";
import PFHTTResponse from "../http/pf-http-response";


export default class AxiosHTTPManager implements PFHTTPManager {


    private processParams(request: PFHTTRequest): any {
        if (request.authCallback !== undefined) {
            request = request.authCallback.process(request);
        }

        let processedRequest: any = {
            url: request.url,
            baseURL: request.baseURL,
            method: request.method,
            data: request.requestData,
            params: request.params,
            timeout: request.timeoutMS,
            onUploadProgress: request.onUploadProgress,
            onDownloadProgress: request.onDownloadProgress,
        }

        if (request.headers !== undefined) {
            processedRequest.headers = request.headers;
        }
        return processedRequest;
    }

    private addHeader(headers: any, key: any, value: any): any {
        if (headers === undefined) {
            headers = {};
        }
        headers[key] = value;
        return headers;
    }

    private addJSONHeader(headers: any): any {
        return this.addHeader(headers, 'Content-Type', 'application/json');
    }

    private addMultipartHeader(headers: any): any {
        return this.addHeader(headers, 'Content-Type', 'multipart/form-data');
    }

    private createResponse(isSuccess: boolean, response: any) {
        return {
            isSuccess: isSuccess,
            httpCode: response.status,
            responseData: response.data,
            headers: response.headers,
            others: response.request,
            optional1: response.statusText,
        }
    }

    private processErrorResponse(error: AxiosError) {
        if (error.response === undefined) {
            let sentResponse: PFHTTResponse = {
                isSuccess: false,
                message: error.message,
            }
            return sentResponse;
        }
        return this.createResponse(false, error.response)
    }


    private httpCall(request: PFHTTRequest, callback: PFHTTCallback) {
        callback.before(request);
        axios(this.processParams(request)).then((response: AxiosResponse) => {
            callback.success(this.createResponse(true, response));
        }).catch((error: AxiosError) => {
            callback.failed(this.processErrorResponse(error));
        }).finally(() => {
            callback.finally();
        });
    }


    public delete(request: PFHTTRequest, callback: PFHTTCallback): void {
        request.method = PFHTTPConst.DELETE;
        this.httpCall(request, callback);
    }


    public deleteJSON(request: PFHTTRequest, callback: PFHTTCallback): void {
        request.method = PFHTTPConst.DELETE;
        request.headers = this.addJSONHeader(request.headers);
        request.requestData = JSON.stringify(request.requestData);
        this.httpCall(request, callback);
    }

    public put(request: PFHTTRequest, callback: PFHTTCallback): void {
        request.method = PFHTTPConst.PUT;
        this.httpCall(request, callback);
    }


    public putJSON(request: PFHTTRequest, callback: PFHTTCallback): void {
        request.method = PFHTTPConst.PUT;
        request.headers = this.addJSONHeader(request.headers);
        request.requestData = JSON.stringify(request.requestData);
        this.httpCall(request, callback);
    }


    public get(request: PFHTTRequest, callback: PFHTTCallback): void {
        request.method = PFHTTPConst.GET;
        this.httpCall(request, callback);
    }


    public post(request: PFHTTRequest, callback: PFHTTCallback): void {
        request.method = PFHTTPConst.POST;
        this.httpCall(request, callback);
    }


    public postJSON(request: PFHTTRequest, callback: PFHTTCallback): void {
        request.method = PFHTTPConst.POST;
        request.requestData = JSON.stringify(request.requestData);
        request.headers = this.addJSONHeader(request.headers);
        this.httpCall(request, callback);
    }

}