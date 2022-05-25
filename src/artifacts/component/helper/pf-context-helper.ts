import {DynamicAction} from "../../config/pf-app-context";
import PFBrowserStorageManager from "../../manager/pf-browser-storage-manager";
import {PFReactConst} from "../../common/pf-react-const";

export default class PFContextHelper {

    private static copy(source: any, destination: any, key: string) {
        if (!source[key]) {
            return destination
        }
        destination[key] = {...destination[key], ...source[key]}
        return destination
    }

    public static addToDynamicAction(key: string, value: DynamicAction) {
        let dynamicAction = PFBrowserStorageManager.getAsJSON(PFReactConst.CONTEXT_DYNAMIC_ACTION)
        if (!dynamicAction) {
            dynamicAction = {}
        }

        let currentDynamicAction = dynamicAction[key]
        if (!currentDynamicAction) {
            dynamicAction[key] = value
        } else {
            currentDynamicAction = this.copy(value, currentDynamicAction, "rowAction")
            currentDynamicAction = this.copy(value, currentDynamicAction, "topAction")
            dynamicAction[key] = currentDynamicAction
        }

        PFBrowserStorageManager.addAsJSONString(PFReactConst.CONTEXT_DYNAMIC_ACTION, dynamicAction)
        return dynamicAction
    }

    public static getDynamicActionItem(dynamicAction: any, projectKey: string, name: string = "rowAction") {
        if (dynamicAction && projectKey) {
            let actions = dynamicAction[projectKey]
            if (actions && actions[name]) {
                return actions[name]
            }
        }
        return undefined
    }

}