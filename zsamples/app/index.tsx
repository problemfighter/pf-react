import ReactDOM from 'react-dom';
import React from 'react';
import AppConfig from "./config/app-config";
import URLMapping from "./config/url-mapping";
import PFPageManager from "@pfo/pf-react/src/artifacts/manager/pf-page-manager";


const appConfig = new AppConfig();
const urlMapping = new URLMapping();
ReactDOM.render(<PFPageManager appConfig={appConfig} urlMapping={urlMapping}/>, document.getElementById('bismillah-sw'));