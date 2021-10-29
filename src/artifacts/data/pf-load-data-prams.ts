export default class PFLoadDataPrams {
    public isReset: Boolean = false;
    public params: any;

    public resetQuery(): PFLoadDataPrams {
        this.isReset = true
        return this
    }

    public setParams(params: any): PFLoadDataPrams {
        this.params = params
        return this
    }
}