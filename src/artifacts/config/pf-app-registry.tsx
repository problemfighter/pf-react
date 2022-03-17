import PFURLMapping from "./pf-url-mapping";
import PFAppConfig from "./pf-app-config";
import {PFAppContextProps} from "./pf-app-context";

export default abstract class PFAppRegistry {

    private pfURLMapping: PFURLMapping = new PFURLMapping()
    private pfAppConfig: PFAppConfig = new PFAppConfig()
    private pfAppContextProps?: PFAppContextProps

    constructor() {
        this.initInternalThings()
    }

    getURLMapping(): PFURLMapping {
        return this.pfURLMapping
    }

    getAppConfig(): PFAppConfig {
        return this.pfAppConfig
    }

    getContextProps(): PFAppContextProps | undefined {
        return this.pfAppContextProps
    }

    private initInternalThings() {
        this.pfAppConfig = this.initAppConfig()
        this.pfURLMapping = this.initURLMapping()
        this.pfAppContextProps = this.initContextProps()
        this.register(this.pfURLMapping, this.pfAppConfig)
    }

    abstract initURLMapping(): PFURLMapping

    abstract initAppConfig(): PFAppConfig

    abstract initContextProps(): PFAppContextProps | undefined


    abstract register(urlMapping: PFURLMapping, appConfig: PFAppConfig): void

}