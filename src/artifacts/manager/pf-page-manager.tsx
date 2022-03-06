import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PFLayoutInfoData from "../data/pf-layout-info-data";
import PFPageInfoData from "../data/pf-page-info-data";
import {PFPageManagerProps} from "../interface/pf-page-manager-props";
import {PFPageManagerState} from "../interface/pf-mixed-interface";
import PFReactComponent from "../component/pf-react-component";
import PFAppConfig from "../config/pf-app-config";
import PFContextComponent from "../component/pf-context-component";


declare global {
    interface Window {
        appConfig: PFAppConfig;
    }
}


export default class PFPageManager extends PFReactComponent<PFPageManagerProps, PFPageManagerState> {

    constructor(props: PFPageManagerProps){
        super(props);
        window.appConfig = this.props.appConfig;
    }

    private getRouter(pageInfoData: PFPageInfoData, Layout: any, index: any) {
        const {appConfig} = this.props;
        return (
            <Route
                exact
                path={pageInfoData.relativeURL}
                key={index}
                render={(route) => {
                    return (<Layout component={pageInfoData.component} route={route} appConfig={appConfig} />)
                }}
            />
        )
    }


    private generateURL(pageInfoDataList: Array<PFPageInfoData>, layoutData: any, index: any) {
        return pageInfoDataList.map((pageInfoData: PFPageInfoData, nestedIndex) => {
            if (pageInfoData.isActive) {
                return this.getRouter(pageInfoData, layoutData.layout, index);
            }
        });
    }


    render() {
        const {urlMapping, appConfig, contextProps} = this.props
        return (
            <PFContextComponent contextProps={contextProps} appConfig={appConfig}>
                <BrowserRouter>
                    <Switch>
                        {
                            urlMapping.getLayoutsAndPages().map((layoutData: PFLayoutInfoData, index: any) => {
                                if (layoutData.pageInfoDataList.length !== 0) {
                                    return this.generateURL(layoutData.pageInfoDataList, layoutData, index);
                                }
                            })
                        }
                        <Route component={appConfig.getNotFoundView}/>
                    </Switch>
                </BrowserRouter>
            </PFContextComponent>
        );
    }


}