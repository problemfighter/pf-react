import React from "react";
import {PFMessageData} from "../data/pf-message-data";

export interface DynamicAction {
    rowAction?: { [key: string]: any }
    topAction?: { [key: string]: any }
}

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

    dynamicAction?: { [key: string]: DynamicAction }
    updateDynamicAction?: (key: string, value: DynamicAction) => void
    loadDynamicAction?: () => void
}

const PFAppContext = React.createContext<PFAppContextProps | null>(null)
export {PFAppContext}