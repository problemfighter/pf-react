import ReactDOM from 'react-dom';
import React from 'react';
import AppConfig from "./app/config/app-config";
import URLMapping from "./app/config/url-mapping";
import PFPageManager from "../artifacts/manager/pf-page-manager";

const appConfig = new AppConfig();
const urlMapping = new URLMapping();
console.log('Bismillah ---')
ReactDOM.render(<PFPageManager appConfig={appConfig} urlMapping={urlMapping}/>, document.getElementById('root'));