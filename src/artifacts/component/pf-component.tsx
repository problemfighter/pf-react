import React from 'react';
import PFComponentState from './pf-component-state';
import {PFProps} from "../interface/pf-mixed-interface";
import PFReactComponent from "./pf-react-component";
import PFAppConfig from "../config/pf-app-config";
import {FieldSpecification} from "../data/pf-input-definition";
import {PFComponentHelper} from "./helper/pf-component-helper";
import {PFException} from "../common/pf-exception";
import {PFMessageData} from "../data/pf-message-data";
import {PFHttpRequestHelper} from "./helper/pf-http-request-helper";
import {PFUtil} from "../utils/pf-util";
import PFStaticHolder from "../utils/pf-static-holder";
import {SortDirection} from "../data/pf-mixed-data";
import {PFAppContext} from "../config/pf-app-context";

export default class PFComponent<P extends PFProps, S extends PFComponentState> extends PFReactComponent<P, S> {


    private readonly REDIRECT_DATA: string = "REDIRECT_DATA";

    // @ts-ignore
    state: PFComponentState = new PFComponentState();
    public fieldSpecification: FieldSpecification = new FieldSpecification();
    private pfComponentHelper!: PFComponentHelper
    public httpRequest!: PFHttpRequestHelper
    pageTitle!: string
    static contextType = PFAppContext
    context: any


    constructor(props: any) {
        super(props);
        const _this = this;
        this.pfComponentHelper = new PFComponentHelper(
            this.state,
            this.fieldSpecification, _this.allowControlFromChild()
        )
        this.httpRequest = new PFHttpRequestHelper(_this.appConfig(), _this.allowControlFromChild(), _this)
        this.fieldDefinition(this.fieldSpecification)
        this.setPageTitle()
    }

    public setPageTitle(pageTitle?: string) {
        let title = pageTitle
        if (!title && this.pageTitle) {
            title = this.pageTitle
        } else if (this.props.appConfig?.pageTitle) {
            if (!document.title || document.title === "") {
                title = this.props.appConfig?.pageTitle
            }
        }
        if (title) {
            if (this.props.appConfig?.pageTitlePostFix) {
                title += " " + this.props.appConfig?.pageTitlePostFix
            }
            document.title = title
        }
    }

    public resetForm() {
        this.fieldDefinition(this.fieldSpecification)
        this.resetFormData()
    }

    public addMetaTag(attributes: object) {
        let meta = document.createElement('meta');
        let isFirst: boolean = true
        let isExistingTag: boolean = false
        Object.entries(attributes).forEach(([key, value], index) => {
            if (isFirst) {
                isFirst = false
                let existingMetaTage: any = document.querySelector('meta[' + key + '="' + value + '"]')
                if (existingMetaTage) {
                    isExistingTag = true
                    meta = existingMetaTage
                }
            }
            meta.setAttribute(key, value)
        });
        if (!isExistingTag) {
            document.getElementsByTagName('head')[0].appendChild(meta);
        }
    }

    public addSocialMediaMeta(url: string, title?: string, description?: string, image?: string) {
        if (url) {
            this.addMetaTag({"property": "og:url", "content": url})
        }
        if (title) {
            this.addMetaTag({"property": "og:title", "content": title})
        }
        if (description) {
            this.addMetaTag({"property": "og:description", "content": description})
        }
        if (image) {
            this.addMetaTag({"property": "og:image", "content": image})
        }
    }

    public removeFieldSpecification(...fields: any) {
        const _this = this
        if (fields) {
            fields.forEach((field: string) => _this.fieldSpecification.removeItem(field))
        }
    }

    private appConfig(): PFAppConfig {
        if (this.props.appConfig) {
            return this.props.appConfig
        }
        return window.appConfig;
    }

    public notifyComponentChange() {
        this.setState<never>({
                ["componentChanged"]: Math.random() * 100000000000
            }
        );
    }

    private allowControlFromChild() {
        const _this = this;
        return {
            call(actionName?: string, data?: any) {
                switch (actionName) {
                    case "notify":
                        _this.notifyComponentChange()
                        break
                    case "showLoader":
                        _this.showLoader()
                        break
                    case "hideLoader":
                        _this.hideLoader()
                        break
                }
            }
        }
    }

    public getComponentHelper(): PFComponentHelper {
        return this.pfComponentHelper
    }

    public renderUI() {
        return (
            <h1>PF React Application View Component</h1>
        );
    }

    // Override this method on view component for field definition
    public fieldDefinition(field: FieldSpecification) {}


    public showServerSideFormValidationError(errors: Object) {
        this.pfComponentHelper.showServerSideFormValidationError(errors)
    }


    public setInputDefaultValue(name: string, value: any) {
        this.updateInputValue(name, value)
    }

    public updateInputValue(name: string, value: any) {
        let inputAttributes: any = this.pfComponentHelper.getInputDefinitionToAttributes(name)
        inputAttributes.value = value
        this.pfComponentHelper.updateInputValue(name, inputAttributes)
        this.state.formData[name] = value
        this.pfComponentHelper.setFormData(this.state.formData)
        this.notifyComponentChange()
    }

    public setupFieldAttrs(name: string) {
        let inputAttributes: any = this.pfComponentHelper.getInputDefinitionToAttributes(name)
        this.pfComponentHelper.handleOnChangeEvent(inputAttributes)
        this.pfComponentHelper.handleOnBlurEvent(inputAttributes)
        this.pfComponentHelper.updateInputValue(name, inputAttributes)
        return inputAttributes
    }

    public getFormDataValueByName(name: string, defaultValue: any = undefined) {
        if (this.state.formData && this.state.formData[name]) {
            return this.state.formData[name]
        }
        return defaultValue
    }

    public getFormData(message: string = "Data Validation Error") {
        if (this.pfComponentHelper.validateEachDataOfFormData()) {
            return this.state.formData
        }
        this.notifyComponentChange()
        throw new PFException(message)
    }

    public setFormData(formData: { [key: string]: any }) {
        this.state.formData = formData
        this.pfComponentHelper.setFormData(formData)
        this.notifyComponentChange()
    }

    public resetFormData() {
        this.setFormData({})
    }

    public removeDataFromFormData(name: string) {
        this.pfComponentHelper.removeDataFromFormData(name)
    }

    public setValueToFromData(name: string, value: any) {
        this.state.formData[name] = value
        this.pfComponentHelper.setValueToFromData(name, value)
    }

    public getBaseUrl(): string {
        return this.appConfig().getBaseURL();
    }

    public showErrorFlash(message: string) {
        this.context?.updateFlashMessage(true, PFMessageData.failed(message))
        this.setState({
                messageData: PFMessageData.failed(message),
                isShowFlashMessage: true
            }
        );
    }

    public showSuccessFlash(message: string) {
        this.context?.updateFlashMessage(true, PFMessageData.success(message))
        this.setState({
                messageData: PFMessageData.success(message),
                isShowFlashMessage: true
            }
        );
    }

    public closeFlashMessage() {
        this.context?.updateFlashMessage(false)
        this.setState({
                isShowFlashMessage: false
            }
        );
    }

    public showLoader() {
        this.context?.showHideLoader(true)
        this.setState({
                isShowLoader: true
            }
        );
    }

    public hideLoader() {
        this.context?.showHideLoader(false)
        this.setState({
                isShowLoader: false
            }
        );
    }

    public redirect(url: any) {
        PFUtil.gotoUrl(this, url);
    }

    public showLoginUI() {
        this.setState({showLoginUI: true});
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

    public failedRedirect(url: any, message: string, resumeUrl?: any) {
        PFStaticHolder.addMessageData(message, false);
        if (resumeUrl) {
            url += "?resume=" + resumeUrl
        }
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

    public tableColumnSortAction(event: any, sortDirection: SortDirection, fieldName?: string, callBack?: any): void {
        if (fieldName && sortDirection) {
            this.setState(status => {
                return {
                    orderBy: fieldName,
                    sortDirection: sortDirection
                }
            }, () => {
                if (callBack) {
                    callBack();
                }
            });
        }
    }

    beforeRenderCall() {
        this.pfComponentHelper.updateState(this.state)
        this.setPageTitle()
    }

    render() {
        this.beforeRenderCall()
        return (
            <React.Fragment>
                {this.appConfig().getBeforeRenderUIView(this.state, this)}
                {this.renderUI()}
            </React.Fragment>
        )
    }

}