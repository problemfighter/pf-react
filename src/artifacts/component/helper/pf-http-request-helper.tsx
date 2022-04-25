import PFAppConfig from "../../config/pf-app-config";
import PFHTTPManager from "../../processor/http/pf-http-manager";
import PFHTTRequest from "../../processor/http/pf-http-request";
import {HTTPCallback, ParentActionCaller, PFHTTPCall} from "../../interface/pf-mixed-interface";
import PFHTTCallback from "../../processor/http/pf-http-callback";
import PFHTTResponse from "../../processor/http/pf-http-response";
import {HTTPLastCalledData} from "../../data/pf-mixed-data";
import {PFUtil} from "../../utils/pf-util";

export class PFHttpRequestHelper {

    private appConfig!: PFAppConfig
    private parentComponent: any
    private lastCalledData!: HTTPLastCalledData
    private parentActionCaller?: ParentActionCaller;
    private readonly POST: string = "post";
    private readonly DELETE: string = "delete";
    private readonly PUT: string = "put";
    private readonly GET: string = "get";

    constructor(appConfig: PFAppConfig, parentActionCaller?: ParentActionCaller, parentComponent?: any) {
        this.appConfig = appConfig
        this.parentActionCaller = parentActionCaller
        this.parentComponent = parentComponent
    }

    private showLoader() {
        this.parentActionCaller?.call("showLoader")
    }

    private hideLoader() {
        this.parentActionCaller?.call("hideLoader")
    }

    private resumeAbleCallback(success?: HTTPCallback, failed?: HTTPCallback): PFHTTCallback {
        return {
            before: (response: PFHTTResponse) => {
                this.showLoader();
            },
            success: (response: PFHTTResponse) => {
                if (success !== undefined) {
                    success.callback(response);
                }
            },
            failed: (response: PFHTTResponse) => {
                if (failed !== undefined) {
                    failed.callback(response);
                }
            },
            finally: () => {
                this.hideLoader();
            }
        };
    }

    public resumeHttpRequest(request: PFHTTRequest, callback: PFHTTCallback) {
        switch (request.method) {
            case this.POST :
                this.httpManager().post(request, callback);
                break;
            case this.DELETE :
                this.httpManager().delete(request, callback);
                break;
            case this.PUT :
                this.httpManager().put(request, callback);
                break;
            case this.GET :
                this.httpManager().get(request, callback);
                break;
        }
    }

    private resumeLastFailedRequest(): void {
        if (this.lastCalledData) {
            let lastCallData: HTTPLastCalledData = this.lastCalledData;
            if (lastCallData.request && lastCallData.resumeAbleCallback) {
                this.resumeHttpRequest(lastCallData.request, lastCallData.resumeAbleCallback)
            }
        }
    }

    private renewAuthorizationAndResumeLastCall(): void {
        const _this = this;
        let trHttpCall: PFHTTPCall = {
            resume(): void {
                _this.resumeLastFailedRequest();
            },
            getComponent(): any {
                return _this.parentComponent;
            },
            getHttpRequestHelper(): any {
                return _this;
            }
        };
        this.appConfig.renewAuthorization(trHttpCall);
    }

    private getCallBackHandler(request: PFHTTRequest, success?: HTTPCallback, failed?: HTTPCallback): PFHTTCallback {
        let resumeAbleCallback = this.resumeAbleCallback(success, failed);
        let lastCall: HTTPLastCalledData = {
            resumeAbleCallback: resumeAbleCallback,
            request: request
        };

        const _this = this;
        this.lastCalledData = lastCall
        let callback: PFHTTCallback = {
            before: (response: PFHTTResponse) => {
                _this.showLoader();
            },
            success: (response: PFHTTResponse) => {
                if (this.appConfig.isAuthorized(response)) {
                    resumeAbleCallback.success(response);
                } else {
                    _this.renewAuthorizationAndResumeLastCall();
                }
            },
            failed: (response: PFHTTResponse) => {
                if (this.appConfig.isAuthorized(response)) {
                    resumeAbleCallback.failed(response);
                } else {
                    _this.renewAuthorizationAndResumeLastCall();
                }
            },
            finally: () => {
                _this.hideLoader();
            }
        };
        return callback;
    }

    private httpManager(): PFHTTPManager {
        return this.appConfig.getHTTPManager();
    }

    private httpRequestObject(relativeURL: string, requestConfig?: PFHTTRequest): PFHTTRequest {
        let request: PFHTTRequest = new PFHTTRequest();
        if (requestConfig) {
            request = requestConfig
        }
        request.baseURL = this.appConfig.getBaseURL();
        request.url = relativeURL;
        let authCallback = this.appConfig.authCallback();
        if (authCallback) {
            request.authCallback = this.appConfig.authCallback();
        }
        return request;
    }

    private convertDataObjectToFormData(data: any) {
        let formData = new FormData();
        if (data) {
            for (let key in data) {
                if (data[key] instanceof Array) {
                    let items: Array<any> = data[key];
                    items.forEach((value: any) => {
                        formData.append(key, value);
                    })
                } else {
                    formData.append(key, data[key]);
                }
            }
        }
        return formData
    }

    public post(url: string, data: object, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: PFHTTRequest): void {
        let request: PFHTTRequest = this.httpRequestObject(url, requestConfig);
        request.method = this.POST;
        request.requestData = data;
        let callback: PFHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().post(request, callback);
    }

    public postMultipartFormData(url: string, formData: FormData, success?: HTTPCallback, failed?: HTTPCallback, onUploadProgress?: any, requestConfig?: PFHTTRequest): void {
        let request: PFHTTRequest = this.httpRequestObject(url, requestConfig);
        request.headers = request.headers = PFUtil.addDataToObject(request.headers, 'Content-Type', 'multipart/form-data');
        request.method = this.POST;
        request.onDownloadProgress = onUploadProgress;
        request.requestData = formData
        let callback: PFHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().post(request, callback);
    }

    public postFile(url: string, data: object, success?: HTTPCallback, failed?: HTTPCallback, onUploadProgress?: any, requestConfig?: PFHTTRequest): void {
        let request: PFHTTRequest = this.httpRequestObject(url, requestConfig);
        request.headers = request.headers = PFUtil.addDataToObject(request.headers, 'Content-Type', 'multipart/form-data');
        request.method = this.POST;
        request.onDownloadProgress = onUploadProgress;
        request.requestData = this.convertDataObjectToFormData(data);
        let callback: PFHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().post(request, callback);
    }

    public postObjectToFormData(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestObject(url);
        request.method = this.POST;
        request.requestData = this.convertDataObjectToFormData(data);
        let callback: PFHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().post(request, callback);
    }

    public postFormData(url: string, formData: FormData, success?: HTTPCallback, failed?: HTTPCallback, requestConfig?: PFHTTRequest): void {
        let request: PFHTTRequest = this.httpRequestObject(url, requestConfig);
        request.method = this.POST;
        request.requestData = formData;
        let callback: PFHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().post(request, callback);
    }

    public postJson(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestObject(url);
        request.method = this.POST;
        if (data instanceof Map) {
            request.requestData = PFUtil.mapToObject(data);
        } else {
            request.requestData = data
        }
        request.requestData = PFUtil.makeDataObject(request.requestData);
        let callback: PFHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().postJSON(request, callback);
    }

    public putJson(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestObject(url);
        request.method = this.PUT;
        if (data instanceof Map) {
            request.requestData = PFUtil.mapToObject(data);
        } else {
            request.requestData = data
        }
        request.requestData = PFUtil.makeDataObject(request.requestData);
        let callback: PFHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().putJSON(request, callback);
    }

    public delete(url: string, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestObject(url);
        request.method = this.DELETE;
        let callback: PFHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().delete(request, callback);
    }

    public deleteByJson(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestObject(url);
        request.method = this.DELETE;
        if (data instanceof Map) {
            request.requestData = PFUtil.mapToObject(data);
        } else {
            request.requestData = data
        }
        request.requestData = PFUtil.makeDataObject(request.requestData);
        let callback: PFHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().deleteJSON(request, callback);
    }

    public getByParams(url: string, queryParams?: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestObject(url);
        request.params = queryParams
        request.method = this.GET;
        let callback: PFHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().get(request, callback);
    }

    public getRequest(url: string, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestObject(url);
        request.method = this.GET;
        let callback: PFHTTCallback = this.getCallBackHandler(request, success, failed);
        this.httpManager().get(request, callback);
    }

}