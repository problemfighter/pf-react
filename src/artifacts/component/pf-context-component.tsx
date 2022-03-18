import PFReactComponent from "./pf-react-component";
import {PFProps, PFState} from "../interface/pf-mixed-interface";
import PFAppConfig from "../config/pf-app-config";
import {PFAppContext, PFAppContextProps} from "../config/pf-app-context";
import {PFMessageData} from "../data/pf-message-data";

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


    render() {
        return (
            <PFAppContext.Provider value={this.state.contextProps}>
                {this.props.children}
            </PFAppContext.Provider>
        )
    }

}