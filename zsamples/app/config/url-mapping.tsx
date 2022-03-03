import React from 'react';
import PFURLMapping from "@pfo/pf-react/src/artifacts/config/pf-url-mapping";
import PFLayoutInfoData from "@pfo/pf-react/src/artifacts/data/pf-layout-info-data";
import PublicLayout from "../view/layouts/public-layout";
import AppUrlMapping from "../view/app-url-mapping";



export default class URLMapping extends PFURLMapping {

    public getLayoutsAndPages(): Array<PFLayoutInfoData> {
        let pageWithLayout: Array<PFLayoutInfoData> = [];

        let publicLayoutInfo: PFLayoutInfoData = new PFLayoutInfoData();
        publicLayoutInfo.layout = PublicLayout
        publicLayoutInfo = AppUrlMapping.publicUrlMappings(publicLayoutInfo)

        pageWithLayout.push(publicLayoutInfo);
        return pageWithLayout
    }

}