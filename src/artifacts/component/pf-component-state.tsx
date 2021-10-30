import {PFMessageData} from '../data/pf-message-data';
import {PFState} from "../interface/pf-mixed-interface";
import {SortDirection} from "../data/pf-mixed-data";

export default class PFComponentState implements PFState {

    public formData: { [key: string]: any } = {};
    public isShowLoader: boolean = false;
    public isShowFlashMessage: boolean = false;
    public messageData: PFMessageData = PFMessageData.failed("Unexpected Error!");
    public itemPerPage: number = 20
    public currentPage: number = 1
    public totalPage: number = 0




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



}