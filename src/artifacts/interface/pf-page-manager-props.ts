import {PFProps} from "./pf-mixed-interface";
import PFAppConfig from "../config/pf-app-config";
import PFURLMapping from "../config/pf-url-mapping";
import {PFAppContextProps} from "../config/pf-app-context";


export interface PFPageManagerProps extends PFProps {
    urlMapping: PFURLMapping;
    appConfig: PFAppConfig;
    contextProps?: PFAppContextProps
}