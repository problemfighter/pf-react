import React from "react";
import PFLayoutInfoData from "@pfo/pf-react/src/artifacts/data/pf-layout-info-data";
import {_loadTranslation} from "@pfo/pf-pweb-i18n/app/pweb-i18n";
import PFURLMapping from "@pfo/pf-react/src/artifacts/config/pf-url-mapping";
import PFAppConfig from "@pfo/pf-react/src/artifacts/config/pf-app-config";


const IndexView = React.lazy(() => import('./index-view'));

const UI_BASE_URL = "/"
const API_BASE_URL = "api/v1/example/"

export default class FeatureConfig {

    public static readonly API_URL = {
        CREATE: API_BASE_URL + "create"
    }

    public static readonly uiURL = {
        index: UI_BASE_URL,
    }

    private static privateUrlMappings(privateLayoutInfo: PFLayoutInfoData): PFLayoutInfoData {
        return privateLayoutInfo;
    }

    private static publicUrlMappings(publicLayoutInfo: PFLayoutInfoData): PFLayoutInfoData {
        publicLayoutInfo.addPageInstance(this.uiURL.index, IndexView);
        return publicLayoutInfo;
    }

    private static loadTranslation() {
        _loadTranslation("en", {})
        _loadTranslation("bn", {})
    }

    public static register(urlMapping: PFURLMapping, appConfig: PFAppConfig): void {
        this.privateUrlMappings(urlMapping.privateLayout)
        this.publicUrlMappings(urlMapping.publicLayout)
        this.loadTranslation()
    }
}