import {PFProps} from "@pfo/pf-react/src/artifacts/interface/pf-mixed-interface";
import PFComponentState from "@pfo/pf-react/src/artifacts/component/pf-component-state";
import PFSysComponent from "../component/pf-sys-component";

interface Props extends PFProps {}

class State extends PFComponentState {}


export default class PFCommonOperationView extends PFSysComponent<Props, State> {

    renderUI() {
        return <></>
    }

}