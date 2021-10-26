import React from 'react';
import PFComponentState from './pf-component-state';
import {PFProps} from "../interface/pf-mixed-interface";
import PFReactComponent from "./pf-react-component";
import PFAppConfig from "../config/pf-app-config";





export default class PFComponent<P extends PFProps, S extends PFComponentState> extends PFReactComponent<P, S> {


    // @ts-ignore
    state: PFComponentState = new PFComponentState();

    private appConfig(): PFAppConfig {
        if (this.props.appConfig) {
            return this.props.appConfig
        }
        return window.appConfig;
    }

    public renderUI() {
        return (
            <h1>PF React Application View Component</h1>
        );
    }

    // Override this method on view component for field definition
    public fieldDefinition() {}

    render() {
        this.fieldDefinition()
        return (
            <React.Fragment>
                {this.appConfig().getBeforeRenderUIView(this.state, this)}
                {this.renderUI()}
            </React.Fragment>
        )
    }

}