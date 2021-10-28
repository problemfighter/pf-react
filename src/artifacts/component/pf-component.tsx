import React from 'react';
import PFComponentState from './pf-component-state';
import {PFProps} from "../interface/pf-mixed-interface";
import PFReactComponent from "./pf-react-component";
import PFAppConfig from "../config/pf-app-config";
import {FieldSpecification} from "../data/pf-input-definition";
import {PFComponentHelper} from "./helper/pf-component-helper";
import {PFException} from "../common/pf-exception";
import {PFMessageData} from "../data/pf-message-data";

export default class PFComponent<P extends PFProps, S extends PFComponentState> extends PFReactComponent<P, S> {


    // @ts-ignore
    state: PFComponentState = new PFComponentState();
    public fieldSpecification: FieldSpecification = new FieldSpecification();
    private pfComponentHelper!: PFComponentHelper


    constructor(props: any) {
        super(props);
        const _this = this;
        this.pfComponentHelper = new PFComponentHelper(
            this.state,
            this.fieldSpecification,
            {
                call(actionName?: string, data?: any) {
                    _this.notifyComponentChange()
                }
            }
        )
        this.fieldDefinition(this.fieldSpecification)
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


    public setupFieldAttrs(name: string) {
        let inputAttributes: any = this.pfComponentHelper.getInputDefinitionToAttributes(name)
        this.pfComponentHelper.handleOnChangeEvent(inputAttributes)
        this.pfComponentHelper.handleOnBlurEvent(inputAttributes)
        this.pfComponentHelper.updateInputValue(name, inputAttributes)
        return inputAttributes
    }

    public getFormData() {
        if (this.pfComponentHelper.validateEachDataOfFormData()) {
            return this.state.formData
        }
        this.notifyComponentChange()
        throw new PFException("Data Validation Error")
    }

    public setFormData() {

    }

    public getBaseUrl(): string {
        return this.appConfig().getBaseURL();
    }

    public showErrorFlash(message: string) {
        this.setState({
                messageData: PFMessageData.failed(message),
                isShowFlashMessage: true
            }
        );
    }

    public showSuccessFlash(message: string) {
        this.setState({
                messageData: PFMessageData.success(message),
                isShowFlashMessage: true
            }
        );
    }

    public closeFlashMessage() {
        this.setState({
                isShowFlashMessage: false
            }
        );
    }

    public showLoader() {
        this.setState({
                isShowLoader: true
            }
        );
    }

    public hideLoader() {
        this.setState({
                isShowLoader: false
            }
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.appConfig().getBeforeRenderUIView(this.state, this)}
                {this.renderUI()}
            </React.Fragment>
        )
    }

}