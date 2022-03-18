import React from "react";
import {PFMessageData} from "../data/pf-message-data";

export interface PFAppContextProps {
    appConfig?: any
    customConf?: { [key: string]: any } | null
    nav?: any[] | null
    theme?: string
    isImplement?: boolean
    updateProps?: (key: any, value: any) => void

    updateFlashMessage?: (isShow: boolean, messageData?: any) => void
    showHideLoader?: (isShow: boolean) => void

    updateCustomConf?: (key: any, value: any) => void
    isShowLoader: boolean
    isShowFlashMessage: boolean
    messageData: PFMessageData
}

const PFAppContext = React.createContext<PFAppContextProps | null>(null)
export {PFAppContext}