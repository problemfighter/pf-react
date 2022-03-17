import React from 'react';
import PFURLMapping from "@pfo/pf-react/src/artifacts/config/pf-url-mapping";
import PFLayoutInfoData from "@pfo/pf-react/src/artifacts/data/pf-layout-info-data";
import PublicLayout from "../view/layouts/public-layout";


export default class URLMapping extends PFURLMapping {


    public getLayoutsAndPages(): Array<PFLayoutInfoData> {
        let pageWithLayout: Array<PFLayoutInfoData> = [];
        this.publicLayout.layout = PublicLayout

        pageWithLayout.push(this.publicLayout);
        return pageWithLayout
    }

}