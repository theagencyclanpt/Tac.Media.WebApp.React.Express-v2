export interface IStep {
  useStepActions: <TFormData>(stepKey: string, initailData: TFormData) => [TFormData, (eventTarget: EventTarget & HTMLInputElement) => void]
}

export type DynamicFormStruct = { [key: string]: any };