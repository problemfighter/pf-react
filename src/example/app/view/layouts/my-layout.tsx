import React from 'react';
import PFReactComponent from "../../../../artifacts/component/pf-react-component";
import PFLayoutRenderer from "../../../../artifacts/component/pf-layout-rander";


export default class MyLayout extends PFReactComponent<any, any> {

    render() {
        const {component, route, appConfig} = this.props;
        return (
            <React.Fragment>
            <p>My layout</p>
                <PFLayoutRenderer route={route} appConfig={appConfig} component={component}/>
        </React.Fragment>
        );
    }

}