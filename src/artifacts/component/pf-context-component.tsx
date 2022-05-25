import PFReactComponent from "./pf-react-component";
import {PFProps, PFState} from "../interface/pf-mixed-interface";
import PFAppConfig from "../config/pf-app-config";
import {DynamicAction, PFAppContext, PFAppContextProps} from "../config/pf-app-context";
import {PFMessageData} from "../data/pf-message-data";
import PFBrowserStorageManager from "../manager/pf-browser-storage-manager";
import {PFReactConst} from "../common/pf-react-const";
import PFContextHelper from "./helper/pf-context-helper";

interface PFContextProps extends PFProps {
    appConfig: PFAppConfig;
    children: any;
    contextProps?: PFAppContextProps
}

class PFContextState implements PFState {
    contextProps: PFAppContextProps = {
        isShowLoader: false,
        isShowFlashMessage: false,
        messageData: PFMessageData.failed("Unexpected Error!")
    }
}

export default class PFContextComponent extends PFReactComponent<PFContextProps, PFContextState> {

    state: PFContextState = new PFContextState()

    constructor(props: PFContextProps) {
        super(props);
    }

    componentDidMount() {
        const _this = this
        if (_this.props.contextProps) {
            _this.state.contextProps = _this.props.contextProps
        }
        this.initMethods()
    }

    private initMethods() {
        const _this = this
        _this.updatePropsValue("appConfig", this.props.appConfig)

        let updateProps = _this.state.contextProps.updateProps
        _this.state.contextProps.updateProps = (key: any, value: any) => {
            if (updateProps) {
                updateProps(key, value)
            }
            _this.updatePropsValue(key, value)
        }

        let updateFlashMessage = _this.state.contextProps.updateFlashMessage
        _this.state.contextProps.updateFlashMessage = (isShow: boolean, messageData?: any) => {
            if (updateFlashMessage) {
                updateFlashMessage(isShow, messageData)
            }
            _this.updateFlashMessage(isShow, messageData)
        }

        let showHideLoader = _this.state.contextProps.showHideLoader
        _this.state.contextProps.showHideLoader = (isShow: boolean) => {
            if (showHideLoader) {
                showHideLoader(isShow)
            }
            _this.showHideLoader(isShow)
        }

        let updateDynamicAction = _this.state.contextProps.updateDynamicAction
        _this.state.contextProps.updateDynamicAction = (key: string, value: DynamicAction) => {
            if (updateDynamicAction) {
                updateDynamicAction(key, value)
            }
            _this.addToDynamicAction(key, value)
        }

        _this.state.contextProps.loadDynamicAction = () => {
            _this.loadDynamicAction()
        }
        _this.loadDynamicAction()
    }

    updatePropsValue(key: any, value: any) {
        this.setState((oldState: any) => {
            let newContextProps = Object.assign({}, oldState.contextProps)
            newContextProps[key] = value
            return {contextProps: newContextProps}
        })
    }

    showHideLoader(isShow: boolean = false) {
        this.updatePropsValue("isShowLoader", isShow)
    }

    updateFlashMessage(isShow: boolean, messageData: any = PFMessageData.failed("Unexpected Error!")) {
        this.setState((oldState: any) => {
            let newContextProps = Object.assign({}, oldState.contextProps)
            newContextProps.isShowFlashMessage = isShow
            newContextProps.messageData = messageData
            return {contextProps: newContextProps}
        })
    }

    private addToDynamicAction(key: string, value: DynamicAction) {
        let dynamicAction = PFContextHelper.addToDynamicAction(key, value)
        this.updatePropsValue("dynamicAction", dynamicAction)
    }

    private loadDynamicAction() {
        let dynamicAction = PFBrowserStorageManager.getAsJSON(PFReactConst.CONTEXT_DYNAMIC_ACTION)
        if (dynamicAction) {
            this.updatePropsValue("dynamicAction", dynamicAction)
        }
    }


    render() {
        return (
            <PFAppContext.Provider value={this.state.contextProps}>
                {this.props.children}
            </PFAppContext.Provider>
        )
    }

}