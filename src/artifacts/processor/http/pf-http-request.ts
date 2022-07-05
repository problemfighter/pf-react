import PFHTTAuthCallback from "./pf-http-auth-callback";

export default class PFHTTRequest {

    public url?: string;
    public method?: any;
    public baseURL?: string;
    public requestData?: any;
    public params?: any;
    public headers?: any;
    public timeoutMS: number = 60000;
    public isShowLoader: boolean = true;
    public authCallback?: PFHTTAuthCallback;
    public onUploadProgress?: (progressEvent: any) => void;
    public onDownloadProgress?: (progressEvent: any) => void;

}