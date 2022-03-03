import React from 'react';
import PFLayoutRenderer from "@pfo/pf-react/src/artifacts/component/pf-layout-rander";
import PFReactComponent from "@pfo/pf-react/src/artifacts/component/pf-react-component";


export default class PublicLayout extends PFReactComponent<any, any> {

    render() {
        const {component, route, appConfig} = this.props;
        return (
            <>
                <PFLayoutRenderer route={route} appConfig={appConfig} component={component}/>
            </>
        );
    }
}