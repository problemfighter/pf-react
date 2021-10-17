import React from 'react';
import PFComponent from "../../../artifacts/component/pf-component";
import PFComponentState from "../../../artifacts/component/pf-component-state";


export default class MyView extends PFComponent<any, PFComponentState> {
    renderUI() {
        return (
            <React.Fragment>
                <h1>Bismillah to My View</h1>
            </React.Fragment>
        );
    }
}