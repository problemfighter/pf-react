import {Component} from 'react';
import {PFState} from "../interface/pf-mixed-interface";


export default class PFReactComponent<P, S extends PFState> extends Component<P, S> {}