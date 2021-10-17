import React from 'react';
import PFURLMapping from "../../../artifacts/config/pf-url-mapping";
import PFLayoutInfoData from "../../../artifacts/data/pf-layout-info-data";
import MyLayout from "../view/layouts/my-layout";


const MyView = React.lazy(() => import('../view/my-view'));

export default class URLMapping extends PFURLMapping {

    public getLayoutsAndPages(): Array<PFLayoutInfoData> {
        let pageWithLayout: Array<PFLayoutInfoData> = [];

        let publicLayoutInfo: PFLayoutInfoData = new PFLayoutInfoData();
        publicLayoutInfo.layout = MyLayout
        publicLayoutInfo.addPageInstance("/", MyView);
        pageWithLayout.push(publicLayoutInfo);

        return pageWithLayout
    }

}