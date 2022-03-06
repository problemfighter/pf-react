import PFReactComponent from "./pf-react-component";
import {PFProps, PFState} from "../interface/pf-mixed-interface";
import PFAppConfig from "../config/pf-app-config";
import {PFAppContext, PFAppContextProps} from "../config/pf-app-context";

interface PFContextProps extends PFProps {
    appConfig: PFAppConfig;
    children: any;
    contextProps?: PFAppContextProps
}

class PFContextState implements PFState {
    contextProps: PFAppContextProps = {}
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
        _this.updatePropsValue("appConfig", this.props.appConfig)
        _this.state.contextProps.updateProps = (key: any, value: any) => {
            _this.updatePropsValue(key, value)
        }
    }

    updatePropsValue(key: any, value: any) {
        let prevState: any = this.state.contextProps
        prevState[key] = value
        this.setState({contextProps: prevState})
    }


    render() {
        return (
            <PFAppContext.Provider value={this.state.contextProps}>
                {this.props.children}
            </PFAppContext.Provider>
        )
    }

}