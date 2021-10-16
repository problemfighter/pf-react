import {CustomValidation} from "../interface/pf-mixed-interface";

export class PFFormDefinitionData {

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

    public constructor(init?: Partial<PFFormDefinitionData>) {
        Object.assign(this, init);
    }

    setName(value: string): PFFormDefinitionData {
        this.name = value;
        return this;
    }

    setRequired(value: boolean): PFFormDefinitionData {
        this.required = value;
        return this;
    }

    setIsError(value: boolean): PFFormDefinitionData {
        this.isError = value;
        return this;
    }

    setFillValue(fillValue: boolean): PFFormDefinitionData {
        this.fillValue = fillValue;
        return this;
    }

    setCustomValidation(customValidation: CustomValidation): PFFormDefinitionData {
        this.customValidation = customValidation;
        return this;
    }

    setErrorMessage(value: string): PFFormDefinitionData {
        this.errorMessage = value;
        return this;
    }

    setHelpText(helpText: string): PFFormDefinitionData {
        this.helpText = helpText;
        return this;
    }

    setDefaultValue(value: any): PFFormDefinitionData {
        this.defaultValue = value;
        return this;
    }

}