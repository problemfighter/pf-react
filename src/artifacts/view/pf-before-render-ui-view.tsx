import React from 'react';
import { PFProps, PFState } from '../data/pf-data-interface';
import PFComponentState from '../component/pf-component-state';
import PFReactComponent from "../component/pf-react-component";


class Props implements PFProps {
    public componentState?: PFComponentState;
    public component?: any;
}

export default class TRBeforeRenderUIView extends PFReactComponent<Props, PFState> {

    render() {
        return <React.Fragment/>;
    }

}