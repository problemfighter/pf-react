import React, {Suspense} from 'react';
import {PFProps, PFState} from "../interface/pf-mixed-interface";
import PFReactComponent from "./pf-react-component";



export interface LayoutRendererProps extends PFProps {
    component: any
    suspenseLoader?: any
    customOperation?: any
}

export default class PFLayoutRenderer extends PFReactComponent<LayoutRendererProps, PFState> {
    render() {
        const Component = this.props.component;
        const {route, appConfig, suspenseLoader, customOperation} = this.props;
        const suspense = suspenseLoader ? suspenseLoader : appConfig?.getSuspenseLoader();
        return (
            <React.Fragment>
                <Suspense fallback={suspense}>
                    <Component route={route} appConfig={appConfig} customOperation={customOperation}/>
                </Suspense>
            </React.Fragment>
        )
    }
}