import React from "react";
import PFLayoutInfoData from "@pfo/pf-react/src/artifacts/data/pf-layout-info-data";


const ListView = React.lazy(() => import('./xyz-view'));

const UI_BASE_URL = "/xyz"
const API_BASE_URL = "api/v1/role/"

export default class XyzUrlMapping {


    public static readonly API = {};


    public static readonly ui = {
        index: UI_BASE_URL,
    };

    public static privateUrlMappings(privateLayoutInfo: PFLayoutInfoData): PFLayoutInfoData {
        privateLayoutInfo.addPageInstance(this.ui.index, ListView);
        return privateLayoutInfo;
    }

    public static publicUrlMappings(publicLayoutInfo: PFLayoutInfoData): PFLayoutInfoData {
        return publicLayoutInfo;
    }
}