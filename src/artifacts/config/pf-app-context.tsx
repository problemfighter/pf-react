import React from "react";

export interface PFAppContextProps {
    appConfig?: any
    customConf?: { [key: string]: any } | null
    nav?: any[] | null
    theme?: string
    isImplement?: boolean
    updateProps?: (key: any, value: any) => void
    updateCustomConf?: (key: any, value: any) => void
}

const PFAppContext = React.createContext<PFAppContextProps | null>(null)
export {PFAppContext}