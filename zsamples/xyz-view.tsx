import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFComponent from "@pfo/pf-react/src/artifacts/component/pf-component";
import {PFAppContext} from "@pfo/pf-react/src/artifacts/config/pf-app-context";

interface Props extends PFProps {}

class State extends PFComponentState {}


export default class XyzView extends PFComponent<Props, State> {

    state: State = new State();
    static contextType = PFAppContext

    static defaultProps = {}

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {}

    componentDidUpdate(prevProps: Props) {}

    renderUI() {
        return (
            <>
                View
            </>
        )
    }

}