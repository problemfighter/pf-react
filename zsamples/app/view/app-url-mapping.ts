import React from "react";
import PFLayoutInfoData from "@pfo/pf-react/src/artifacts/data/pf-layout-info-data";


const IndexView = React.lazy(() => import('./index-view'));

const UI_BASE_URL = "/"
const API_BASE_URL = "api/v1/example/"

export default class AppUrlMapping {

    public static readonly API = {};

    public static readonly ui = {
        index: UI_BASE_URL,
    };

    public static privateUrlMappings(privateLayoutInfo: PFLayoutInfoData): PFLayoutInfoData {
        return privateLayoutInfo;
    }

    public static publicUrlMappings(publicLayoutInfo: PFLayoutInfoData): PFLayoutInfoData {
        publicLayoutInfo.addPageInstance(this.ui.index, IndexView);
        return publicLayoutInfo;
    }
}