import {PFMessageData} from '../data/pf-message-data';
import {PFState} from "../interface/pf-mixed-interface";
import {SortDirection} from "../data/pf-mixed-data";

export default class PFComponentState implements PFState {

    public formData: { [key: string]: any } = {};
    public isShowLoader: boolean = false;
    public isShowFlashMessage: boolean = false;
    public messageData: PFMessageData = PFMessageData.failed("Unexpected Error!");




    public init: boolean = false;
    public showLoginUI: boolean = false;

    public parentComponent?: any;

    public queryCondition:{[key: string]: any} = {};
    public removeNotInFormDefinition: boolean = false;
    public sortDirection: SortDirection = SortDirection.descending;
    public orderBy: string = "id";
    public search?: string;
    public itemList: Array<object> = [];
    public itemDetails: object = {};
    public maxItem: number = 20;
    public totalItem: number = 0;
    public itemOffset: number = 0;
    public pageOffset: number = 0;

    public setSortDirection(sortDirection: SortDirection): this {
        this.sortDirection = sortDirection;
        return this;
    }

    public setItemOffset(itemOffset: number): this {
        this.itemOffset = itemOffset;
        return this;
    }

    public setMaxItem(maxItem: number): this {
        this.maxItem = maxItem;
        return this;
    }

    public setOrderBy(orderBy: string): this{
        this.orderBy = orderBy;
        return this;
    }


}