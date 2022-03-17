import PFAppRegistry from "@pfo/pf-react/src/artifacts/config/pf-app-registry";
import PFAppConfig from "@pfo/pf-react/src/artifacts/config/pf-app-config";
import PFURLMapping from "@pfo/pf-react/src/artifacts/config/pf-url-mapping";
import AppConfig from "./app-config";
import URLMapping from "./url-mapping";
import {PFAppContextProps} from "@pfo/pf-react/src/artifacts/config/pf-app-context";
import FeatureConfig from "../../module/app/view/feature/feature-config";


export default class AppRegistry extends PFAppRegistry {


    register(urlMapping: PFURLMapping, appConfig: PFAppConfig): void {
        FeatureConfig.register(urlMapping, appConfig)
    }

    initContextProps(): PFAppContextProps | undefined {
        return undefined;
    }

    initAppConfig(): PFAppConfig {
        return new AppConfig();
    }

    initURLMapping(): PFURLMapping {
        return new URLMapping()
    }


}