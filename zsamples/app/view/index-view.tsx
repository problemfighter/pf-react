import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFComponent from "@pfo/pf-react/src/artifacts/component/pf-component";

interface Props extends PFProps {}

class State extends PFComponentState {}


export default class IndexView extends PFComponent<Props, State> {

    state: State = new State();

    static defaultProps = {}

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {}

    componentDidUpdate(prevProps: Props) {}

    renderUI() {
        return <>Index</>
    }

}