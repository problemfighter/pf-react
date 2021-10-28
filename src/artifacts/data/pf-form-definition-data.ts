import {CustomValidation} from "../interface/pf-mixed-interface";
import React from "react";


export interface PFFormDefinitionData {
    name: string
    disabled?: boolean
    placeholder?: string
    required?: boolean
    value?: unknown
    autoComplete?: string
    autoFocus?: boolean

    isMulti?: boolean
    isClearable?: boolean
    isSearchable?: boolean
    options?: Array<any>;
    optionLabel?: string;
    optionValue?: string;

    label?: React.ReactNode;
    error?: boolean
    wasValidated?: boolean
    helperText?: React.ReactNode
    errorText?: React.ReactNode
    successText?: React.ReactNode
    defaultValue?: any
}


export class PFFormDefinitionDataOld {

    public name?: string;
    public required: boolean = false;
    public isErrorAttribute: boolean = true;
    public isHelpTextAttribute: boolean = true;
    public helpText?: string;
    public fillValue: boolean = true;
    public customValidation?: CustomValidation;
    public isError: boolean = false;
    public errorMessage: string = "This Field is Required";
    public defaultValue: any = "";

    public constructor(init?: Partial<PFFormDefinitionDataOld>) {
        Object.assign(this, init);
    }

    setName(value: string): PFFormDefinitionDataOld {
        this.name = value;
        return this;
    }

    setRequired(value: boolean): PFFormDefinitionDataOld {
        this.required = value;
        return this;
    }

    setIsError(value: boolean): PFFormDefinitionDataOld {
        this.isError = value;
        return this;
    }

    setFillValue(fillValue: boolean): PFFormDefinitionDataOld {
        this.fillValue = fillValue;
        return this;
    }

    setCustomValidation(customValidation: CustomValidation): PFFormDefinitionDataOld {
        this.customValidation = customValidation;
        return this;
    }

    setErrorMessage(value: string): PFFormDefinitionDataOld {
        this.errorMessage = value;
        return this;
    }

    setHelpText(helpText: string): PFFormDefinitionDataOld {
        this.helpText = helpText;
        return this;
    }

    setDefaultValue(value: any): PFFormDefinitionDataOld {
        this.defaultValue = value;
        return this;
    }

}