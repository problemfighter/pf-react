import {PFMessageData} from '../data/pf-message-data';
import {PFFormDefinitionData} from "../data/pf-form-definition-data";
import {PFState} from "../interface/pf-mixed-interface";
import {PFLastCallData, SortDirection} from "../data/pf-mixed-data";

export default class PFComponentState implements PFState {
    public init: boolean = false;
    public showProgress: boolean = false;
    public showLoginUI: boolean = false;
    public showFlashMessage: boolean = false;
    public showFlashMessageTimer?: any;
    public messageData: PFMessageData = PFMessageData.failed("Unexpected Error!");
    public parentComponent?: any;
    public pfLastCallData?: PFLastCallData;
    public formData:{[key: string]: any} = {};
    public queryCondition:{[key: string]: any} = {};
    public formDefinition: Map<string, PFFormDefinitionData> = new Map<string, PFFormDefinitionData>();
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

    public setFormDefinition(definition: Map<string, PFFormDefinitionData>) {
        this.formDefinition = definition;
    }
}