import PFHTTPManager from "../processor/http/pf-http-manager";
import AxiosHTTPManager from "../processor/axios/axios-http-manager";
import React, {lazy} from "react";
import PFComponentState from "../component/pf-component-state";
import PFHTTResponse from "../processor/http/pf-http-response";
import PFHTTAuthCallback from "../processor/http/pf-http-auth-callback";
import PFSuspenseView from "../view/pf-suspense-view";
import PFNotFoundView from "../view/pf-not-found-view";
import {PFHTTPCall} from "../interface/pf-mixed-interface";


const PFBeforeRenderUIView = lazy(() => import('../view/pf-before-render-ui-view'));


export default class PFAppConfig {

    public getBeforeRenderUIView(componentState: PFComponentState, component: any) {
        return (<PFBeforeRenderUIView componentState={componentState} component={component}/>)
    }

    public getNotFoundView() {
        return (<PFNotFoundView/>)
    }

    public getSuspenseLoader() {
        return (<PFSuspenseView/>)
    }

    public getHTTPManager(): PFHTTPManager {
        return new AxiosHTTPManager();
    }

    public authCallback(): PFHTTAuthCallback | undefined {
        return undefined;
    }

    public getBaseURL(): string {
        return "";
    }

    public isAuthorized(response?: PFHTTResponse): boolean {
        return true;
    }

    public renewAuthorization(pfHttpCall: PFHTTPCall): void {
        pfHttpCall.resume();
    }

}