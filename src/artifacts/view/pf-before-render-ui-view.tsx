import React from 'react';
import PFComponentState from '../component/pf-component-state';
import PFReactComponent from "../component/pf-react-component";
import {PFState} from "../interface/pf-mixed-interface";


class Props {
    componentState?: PFComponentState;
    component?: any;
}


export default class TRBeforeRenderUIView extends PFReactComponent<Props, PFState> {

    render() {
        return <React.Fragment/>;
    }

}