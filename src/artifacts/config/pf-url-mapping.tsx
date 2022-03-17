import React from 'react';
import PFLayoutInfoData from "../data/pf-layout-info-data";


export default class PFURLMapping {

    public publicLayout: PFLayoutInfoData = new PFLayoutInfoData();
    public privateLayout: PFLayoutInfoData = new PFLayoutInfoData();
    public authLayout: PFLayoutInfoData = new PFLayoutInfoData();
    public otherLayout: PFLayoutInfoData = new PFLayoutInfoData();


    public getLayoutsAndPages(): Array<PFLayoutInfoData> {
        return []
    }

}