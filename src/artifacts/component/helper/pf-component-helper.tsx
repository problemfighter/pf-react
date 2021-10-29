import {BaseInputDefinition, FieldSpecification, InputDataDefinition} from "../../data/pf-input-definition";
import {PFUtil} from "../../utils/pf-util";
import {ParentActionCaller, PFInputEvent} from "../../interface/pf-mixed-interface";
import {PFMessageData, Status} from "../../data/pf-message-data";

export class PFComponentHelper {

    private state!: any;
    private fieldSpecification!: FieldSpecification;
    private parentActionCaller?: ParentActionCaller;

    constructor(state: any, fieldSpecification: FieldSpecification, parentActionCaller?: ParentActionCaller) {
        this.state = state
        this.fieldSpecification = fieldSpecification
        this.parentActionCaller = parentActionCaller
    }

    public updateState(state: any) {
        if (state.constructor.name !== this.state.constructor.name) {
            this.state = state
        }
    }

    private getFilesFromInput(name: string, target: any): Array<File> {
        let files = new Array<File>();
        if (this.state.formData && this.state.formData[name] && this.state.formData[name] instanceof FormData) {
            files = this.state.formData[name];
        }
        if (target && target.files) {
            Array.from(target.files).forEach((file: any) => {
                files.push(file)
            });
        }
        return files;
    }

    private notifyComponentChange() {
        if (this.parentActionCaller) {
            this.parentActionCaller.call("notify")
        }
    }

    private fireInputEvent(event?: PFInputEvent, target?: any) {
        if (event && event.fire) {
            event.fire(target);
        }
    }

    private getInputEvent(name: string, eventName: string) {
        let definition: any = this.fieldSpecification.getDefByName(name)
        if (definition) {
            return definition[eventName]
        }
        return undefined
    }

    public updateFormData(name: string, value: any) {
        if (this.state.formData) {
            this.state.formData[name] = value;
            this.notifyComponentChange()
        }
    }

    public updateFieldSpecificationValidation(name: string, wasValidated?: boolean, error?: boolean, errorMessage?: string) {
        let definition: BaseInputDefinition = this.fieldSpecification.getDefByName(name) as BaseInputDefinition
        if (definition) {
            definition.wasValidated = wasValidated
            definition.error = error
            if (errorMessage) {
                definition.errorText = errorMessage
            }
            this.fieldSpecification.updateFieldDef(definition)
        }
    }

    private removeValidationError(name: string) {
        this.updateFieldSpecificationValidation(name, false, false)
    }

    private addValidationError(name: string) {
        this.updateFieldSpecificationValidation(name, true, true)
    }

    public getValueFromFormData(name: string, defaultValue: any = "") {
        if (this.state.formData && this.state.formData[name]) {
            return this.state.formData[name];
        }
        return defaultValue;
    }

    public getFormData() {
        return this.state.formData
    }

    public removeDataFromFormData(name: string) {
        if (this.state.formData && this.state.formData[name]) {
            delete this.state.formData[name]
        }
    }

    private processCustomValidation(definition: any, name: string) {
        if (definition.customValidation && definition.customValidation.validate) {
            let response: PFMessageData = definition.customValidation.validate(name, this.getValueFromFormData(name), this.state.formData);
            if (response.status === Status.FAILED) {
                this.updateFieldSpecificationValidation(name, true, true, response.message)
                return false;
            }
        }
        return true
    }

    public validateEachDataOfFormData() {
        const _this = this;
        let isValid: boolean = true;
        let definitions: any = new Map(this.fieldSpecification.getDefinitions())
        if (definitions) {
            definitions.forEach(
                (definition: BaseInputDefinition, name: string) => {
                    if (definition.required && !_this.getValueFromFormData(name, undefined)) {
                        isValid = false;
                        _this.addValidationError(name)
                    } else if (!_this.processCustomValidation(definition, name)) {
                        isValid = false;
                    } else {
                        _this.updateFieldSpecificationValidation(name, true)
                    }
                }
            )
        }
        return isValid
    }

    public handleOnChangeEvent(inputAttributes: any) {
        const _this = this;
        inputAttributes.onChange = (event: any) => {
            const target = event.target;
            const name = target.name;
            let value;
            if (target.type === 'file') {
                value = this.getFilesFromInput(name, target);
            } else if (target.type === 'checkbox') {
                value = target.checked;
            } else {
                value = target.value;
            }
            _this.removeValidationError(name);
            _this.updateFormData(name, value)
            _this.fireInputEvent(_this.getInputEvent(name, "changeEvent"), event)
        }
        return inputAttributes
    }

    public handleOnBlurEvent(inputAttributes: any) {
        const _this = this;
        inputAttributes.onBlur = (target: any) => {
            const name = target.name;
            _this.fireInputEvent(_this.getInputEvent(name, "blurEvent"), target)
        };
        return inputAttributes
    }

    public updateInputValue(name: string, inputAttributes: any) {
        let definition: any = this.fieldSpecification.getDefByName(name)
        let defaultValue = ""
        if (definition && definition.defaultValue) {
            defaultValue = definition.defaultValue
        }
        let value = this.getValueFromFormData(name, defaultValue)
        if (value && ((value instanceof Array && value.some((item: any) => item instanceof File)) || (value instanceof File))) {
            value = ""
        } else if (definition && definition.type && definition.type === "file") {
            value = ""
        }
        inputAttributes.value = value
        return inputAttributes
    }

    getInputDefinitionToAttributes(name: string) {
        let inputDefinition: InputDataDefinition | undefined = this.fieldSpecification.getDefByName(name)
        let response: any = {}
        if (inputDefinition) {
            switch (inputDefinition.type) {
                case "select":
                    response = PFUtil.removeProperty(inputDefinition, ["type"])
                    break
                default:
                    response = PFUtil.removeProperty(inputDefinition)
            }
        }
        return response
    }

    public showServerSideFormValidationError(errors: Object) {
        for (let [name, message] of Object.entries(errors)) {
            this.updateFieldSpecificationValidation(name, true, true, message)
        }
    }
}