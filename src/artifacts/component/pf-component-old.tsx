import React from 'react';
import {Status, PFMessageData} from '../data/pf-message-data';
import PFComponentState from './pf-component-state';
import {HTTPCallback, PFInputEvent, PFHTTPCall, PFProps} from "../interface/pf-mixed-interface";
import PFReactComponent from "./pf-react-component";
import {PFLastCallData, SortDirection} from "../data/pf-mixed-data";
import PFAppConfig from "../config/pf-app-config";
import PFHTTPManager from "../processor/http/pf-http-manager";
import PFHTTRequest from "../processor/http/pf-http-request";
import {PFFormDefinitionDataOld} from "../data/pf-form-definition-data";
import PFHTTCallback from "../processor/http/pf-http-callback";
import {PFUtil} from "../utils/pf-util";
import PFStaticHolder from "../utils/pf-static-holder";
import PFHTTResponse from "../processor/http/pf-http-response";





export default class PfComponentOld<P extends PFProps, S extends PFComponentState> extends PFReactComponent<P, S> {

    private POST: string = "post";
    private DELETE: string = "delete";
    private PUT: string = "put";
    private GET: string = "get";
    private REDIRECT_DATA: string = "REDIRECT_DATA";


    public sortItemAction(event: any, onClickData: any, callBack?: any): void {
        let orderBy = this.state.orderBy;
        let sortDirection = this.state.sortDirection;
        if (sortDirection === SortDirection.ascending) {
            sortDirection = SortDirection.descending;
        } else {
            sortDirection = SortDirection.ascending;
        }
        if (onClickData && onClickData.fieldName !== orderBy) {
            orderBy = onClickData.fieldName;
        }
        this.setState(status => {
            return {
                orderBy: orderBy,
                sortDirection: sortDirection
            }
        }, () => {
            if (callBack) {
                callBack();
            }
        });
    }

    componentDidMount() {}

    public setActionTimer(task: any, terminateAfterMS: number = 5000) {
        return setTimeout(() => {
            if (task) {
                task();
            }
        }, terminateAfterMS);
    }

    public closeFlashMessage() {
        this.setState({
            showFlashMessage: false
        });
        if (this.state.showFlashMessageTimer) {
            clearTimeout(this.state.showFlashMessageTimer);
        }
    }

    public closeFlashMessageTimer(terminateAfterMS: number = 10000): any {
        this.setState(state => {
            let showFlashMessageTimer = this.setActionTimer(() => {
                this.closeFlashMessage();
            }, terminateAfterMS);
            return {showFlashMessageTimer: showFlashMessageTimer}
        });
    }


    public showErrorFlash(message: string) {
        this.setState({
            messageData: PFMessageData.failed(message),
            showFlashMessage: true
        });
        this.closeFlashMessageTimer();
    }


    public redirect(url: any) {
        PFUtil.gotoUrl(this, url);
    }

    public redirectWithData(url: any, data: any) {
        PFStaticHolder.addTempData(this.REDIRECT_DATA, data);
        this.redirect(url);
    }

    public getRedirectData() {
        let data = PFStaticHolder.tempData[this.REDIRECT_DATA];
        delete PFStaticHolder.tempData[this.REDIRECT_DATA];
        return data;
    }

    public successRedirect(url: any, message: string) {
        PFStaticHolder.addMessageData(message, true);
        this.redirect(url);
    }

    public failedRedirect(url: any, message: string) {
        PFStaticHolder.addMessageData(message, false);
        this.redirect(url);
    }

    public showRedirectMessage() {
        if (PFStaticHolder.message.message) {
            if (PFStaticHolder.message.isSuccess) {
                this.showSuccessFlash(PFStaticHolder.message.message)
            } else {
                this.showErrorFlash(PFStaticHolder.message.message)
            }
        }
        PFStaticHolder.message = {};
    }

    public showSuccessFlash(message: string) {
        this.setState({
            messageData: PFMessageData.success(message),
            showFlashMessage: true
        });
        this.closeFlashMessageTimer();
    }


    private httpRequestData(url: string): PFHTTRequest {
        let request: PFHTTRequest = new PFHTTRequest();
        // @ts-ignore
        request.baseURL = this.getBaseUrl();
        request.url = url;
        // @ts-ignore
        let authCallback = this.appConfig().authCallback();
        if (authCallback) {
            // @ts-ignore
            request.authCallback = this.appConfig().authCallback();
        }
        return request;
    }


    private setUnsetInputDataError(name: string, isError: boolean = false, errorMessage: string = "") {
        let definition: PFFormDefinitionDataOld | undefined = this.state.formDefinition.get(name);
        if (!definition) {
            return
        }
        if (errorMessage === "") {
            errorMessage = definition.errorMessage;
        }

        isError = definition.required && !this.state.formData[name];
        if (definition.customValidation && definition.customValidation.validate) {
            let response: PFMessageData = definition.customValidation.validate(name, this.state.formData[name], this.state.formData);
            if (response.status === Status.FAILED) {
                isError = true;
                errorMessage = response.message;
            }
        }
        this.updateFormDefinitionData(name, isError, errorMessage)
    }


    private updateFormDefinitionData(name: string, isError: boolean = false, errorMessage: string = "") {
        this.setState((state: any) => {
            let formDefinition = state.formDefinition;
            if (formDefinition.get(name)) {
                formDefinition.get(name).isError = isError;
                formDefinition.get(name).errorMessage = errorMessage;
            }
            return {formDefinition: formDefinition};
        });
    }


    public validateApiResponseData(errors: Object) {
        for (let [name, message] of Object.entries(errors)) {
            if (this.state.formDefinition.get(name) === undefined) {
                this.addFormDefinition(name, new PFFormDefinitionDataOld({
                    required: true,
                    errorMessage: message,
                }));
            }
            this.updateFormDefinitionData(name, true, message)
        }
    }

    private checkCustomValidation(definition: PFFormDefinitionDataOld, name: any): boolean {
        let isValid: boolean = true;
        if (definition.customValidation && definition.customValidation.validate) {
            let response: PFMessageData = definition.customValidation.validate(name, this.state.formData[name], this.state.formData);
            if (response.status === Status.FAILED) {
                isValid = false;
            }
        }
        return isValid
    }

    public validateFormInput(): boolean {
        let isValid: boolean = true;
        if (this.state.formDefinition) {
            this.state.formDefinition.forEach((definition: PFFormDefinitionDataOld, name: string) => {
                if (definition.required && !this.state.formData[name]) {
                    isValid = false;
                    this.setUnsetInputDataError(name);
                } else if (definition.customValidation && !this.checkCustomValidation(definition, name)) {
                    isValid = false;
                    this.setUnsetInputDataError(name);
                }
            });
        }
        if (!isValid) {
            this.showErrorFlash("Validation Error")
        }
        return isValid;
    }


    private onChangeSetInputValue(name: string, value: any) {
        if (this.state.formData) {
            // @ts-ignore
            this.state.formData[name] = value;
            this.setState<never>({
                ["_input_data_" + name]: value,
            });
        }
    }

    public setValueToFormData(name: string, value: any) {
        this.onChangeSetInputValue(name, value)
    }

    public getValueFromFormData(name: string) {
        return this.getFormData(name)
    }

    public setDefaultInputValue(name: string, value: any) {
        if (this.state.formData) {
            // @ts-ignore
            this.state.formData[name] = value;
        }
    }

    public setDefaultValues(keyValues: object) {
        let _this = this;
        if (keyValues) {
            for (let [name, value] of Object.entries(keyValues)) {
                _this.setDefaultInputValue(name, value);
            }
            this.setState<never>({
                ["_input_data_default"]: "init",
            });
        }
    }

    public getFormData(name: string, defaultValue: any = "") {
        if (this.state.formData && this.state.formData[name]) {
            return this.state.formData[name];
        }
        return defaultValue;
    }

    public removeFormDataElement(name: string) {
        if (this.state.formData && this.state.formData[name]) {
            delete this.state.formData[name]
        }
    }

    private getInputValue(name: string) {
        return this.getFormData(name);
    }

    public mapToObject(map: Map<string, any>): object {
        return PFUtil.mapToObject(map);
    }

    public mapToJson(map: Map<string, any>): string {
        return PFUtil.mapToJson(map);
    }

    private getFieldDefinition(name: string): PFFormDefinitionDataOld | any {
        return this.state.formDefinition.get(name);
    }






    public addFormDefinition(name: string, fullDefinition?: PFFormDefinitionDataOld) {
        let definition: PFFormDefinitionDataOld = fullDefinition ? fullDefinition : new PFFormDefinitionDataOld();
        definition.name = name;
        this.state.formDefinition.set(name, definition);
    }

    public getFormDefinition(name: string) {
        return this.state.formDefinition.get(name);
    }

    public conditionalNotRequired(name: string, isRequired: boolean) {
        let definition = this.getFormDefinition(name)
        if (definition) {
            definition.required = isRequired
            this.updateFormDefinition(definition)
        }
    }

    public updateFormDefinition(fullDefinition: PFFormDefinitionDataOld) {
        let name = fullDefinition.name ? fullDefinition.name : ""
        return this.state.formDefinition.set(name, fullDefinition);
    }

    public setFormDefinition(fullDefinition: Map<string, PFFormDefinitionDataOld>) {
        this.state.setFormDefinition(fullDefinition);
    }


    public resumeHttpRequest(request: PFHTTRequest, callback: PFHTTCallback) {
        switch (request.method) {
            case this.POST :
                this.httpCaller().post(request, callback);
                break;
            case this.DELETE :
                this.httpCaller().delete(request, callback);
                break;
            case this.PUT :
                this.httpCaller().put(request, callback);
                break;
            case this.GET :
                this.httpCaller().get(request, callback);
                break;
        }
    }

    private resumeableCallback(success?: HTTPCallback, failed?: HTTPCallback): PFHTTCallback {
        return {
            before: (response: PFHTTResponse) => {
                this.showProgress();
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
                this.hideProgress();
            }
        };
    }

    public showLoginUI() {
        this.setState({showLoginUI: true});
    }

    public showProgress() {
        this.setState({showProgress: true});
    }

    public hideProgress() {
        this.setState({showProgress: false});
    }

    private renewAuthorization(): void {
        if (this.state.pfLastCallData) {
            let pfLastCallData: PFLastCallData = this.state.pfLastCallData;
            if (pfLastCallData.request && pfLastCallData.resumeableCallback) {
                this.resumeHttpRequest(pfLastCallData.request, pfLastCallData.resumeableCallback)
            }
        }
    }


    private renewAuthorizationCallBack(): void {
        const _this = this;
        let trHttpCall: PFHTTPCall = {
            resume(): void {
                _this.renewAuthorization();
            },
            getComponent(): any {
                return _this;
            }
        };
        // @ts-ignore
        this.appConfig().renewAuthorization(trHttpCall);
    }


    private createHttpCallBack(request: PFHTTRequest, success?: HTTPCallback, failed?: HTTPCallback): PFHTTCallback {
        let resumeableCallback = this.resumeableCallback(success, failed);
        let lastCall: PFLastCallData = {
            resumeableCallback: resumeableCallback,
            request: request
        };
        const _this = this;
        this.setState({pfLastCallData: lastCall});
        let callback: PFHTTCallback = {
            before: (response: PFHTTResponse) => {
                this.showProgress();
            },
            success: (response: PFHTTResponse) => {
                // @ts-ignore
                if (this.appConfig().isAuthorized(response)) {
                    resumeableCallback.success(response);
                } else {
                    _this.renewAuthorizationCallBack();
                }
            },
            failed: (response: PFHTTResponse) => {
                // @ts-ignore
                if (this.appConfig().isAuthorized(response)) {
                    resumeableCallback.failed(response);
                } else {
                    _this.renewAuthorizationCallBack();
                }
            },
            finally: () => {
                this.hideProgress();
            }
        };
        return callback;
    }

    private httpCaller(): PFHTTPManager {
        // @ts-ignore
        return this.appConfig().getHTTPManager();
    }


    public postToApi(url: string, data: object, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestData(url);
        request.method = this.POST;
        request.requestData = data;
        let callback: PFHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().post(request, callback);
    }

    public postFileToApi(url: string, data: object, success?: HTTPCallback, failed?: HTTPCallback, onUploadProgress?: any): void {
        let request: PFHTTRequest = this.httpRequestData(url);
        request.headers = request.headers = PFUtil.addDataToObject(request.headers, 'Content-Type', 'multipart/form-data');
        request.method = this.POST;
        request.onDownloadProgress = onUploadProgress;
        request.requestData = this.processDataToFormData(data);
        let callback: PFHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().post(request, callback);
    }

    public putToApi(url: string, data: object, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestData(url);
        request.method = this.PUT;
        request.requestData = data;
        let callback: PFHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().put(request, callback);
    }

    private processDataToFormData(data: any) {
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

    public postFormDataToApi(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestData(url);
        request.method = this.POST;
        request.requestData = this.processDataToFormData(data);
        let callback: PFHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().post(request, callback);
    }

    public postJsonDataToApi(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestData(url);
        request.method = this.POST;
        if (data instanceof Map) {
            request.requestData = this.mapToObject(data);
        } else {
            request.requestData = data
        }
        request.requestData = PFUtil.makeDataObject(request.requestData);
        let callback: PFHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().postJSON(request, callback);
    }

    public postJsonToApi(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestData(url);
        request.method = this.POST;
        if (data instanceof Map) {
            request.requestData = this.mapToObject(data);
        } else {
            request.requestData = data
        }
        let callback: PFHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().postJSON(request, callback);
    }

    public putJsonToApi(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestData(url);
        request.method = this.PUT;
        if (data instanceof Map) {
            request.requestData = this.mapToObject(data);
        } else {
            request.requestData = data
        }
        let callback: PFHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().putJSON(request, callback);
    }


    public deleteJsonToApi(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestData(url);
        request.method = this.DELETE;
        if (data instanceof Map) {
            request.requestData = this.mapToObject(data);
        } else {
            request.requestData = data
        }
        let callback: PFHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().deleteJSON(request, callback);
    }

    public deleteToApi(url: string, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestData(url);
        request.method = this.DELETE;
        let callback: PFHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().delete(request, callback);
    }

    public getToApiByParams(url: string, queryParams?: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestData(url);
        request.params = queryParams
        request.method = this.GET;
        let callback: PFHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().get(request, callback);
    }


    public getToApi(url: string, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: PFHTTRequest = this.httpRequestData(url);
        request.method = this.GET;
        let callback: PFHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().get(request, callback);
    }


    public showProgressbar = () => {
        this.setState({showProgress: true})
    };


    public hideProgressbar = () => {
        this.setState({showProgress: false})
    };



}