import PFPageInfoData from "./pf-page-info-data";


export default class PFLayoutInfoData {


    public layout: any;
    public pageInfoDataList: Array<PFPageInfoData> = [];


    public addPage(pageInfo: PFPageInfoData): PFLayoutInfoData {
        this.pageInfoDataList.push(pageInfo);
        return this;
    }

    public addPageInstance(relativeURL: string, component: any): PFLayoutInfoData {
        this.pageInfoDataList.push(this.pageInfoInstance(relativeURL, component));
        return this;
    }

    public concatComponent(pageInfoDataList: Array<PFPageInfoData>): PFLayoutInfoData {
        this.pageInfoDataList = this.pageInfoDataList.concat(pageInfoDataList);
        return this;
    }

    public getPageInfoList(): Array<PFPageInfoData> {
        return this.pageInfoDataList;
    }

    public pageInfoInstance(relativeURL: string, component: any): PFPageInfoData {
        let pageInfo = new PFPageInfoData();
        pageInfo.relativeURL = relativeURL;
        pageInfo.component = component;
        return pageInfo;
    }

    public static instance(layout: any): PFLayoutInfoData {
        let layoutData = new PFLayoutInfoData();
        layoutData.layout = layout;
        return layoutData;
    }

}