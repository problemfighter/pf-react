import React from 'react';
import PFComponentState from './pf-component-state';
import {PFProps} from "../interface/pf-mixed-interface";
import PFComponent from "./pf-component";

export default class PFSysComponent<P extends PFProps, S extends PFComponentState> extends PFComponent<P, S> {


    constructor(props: any) {
        super(props);
    }

    public renderUI() {
        return (
            <h1>PF React System Component</h1>
        );
    }


    render() {
        this.beforeRenderCall()
        return (this.renderUI())
    }

}