/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@/ui/hooks/persist.localstorage.hook";
import { IStep, DynamicFormStruct } from "./IStep";

interface FormProgressWizardProps {
  Id: string;
  Steps: {
    [key: string]: (props: IStep) => JSX.Element
  },
}

interface FormProgressWizardState {
  Steps: {
    [key: string]: DynamicFormStruct
  }
}

export function FormProgressWizard({ Id, Steps }: FormProgressWizardProps): JSX.Element {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormProgressWizardState>({
    Steps: {}
  });
  const stepsLength = Object.keys(Steps).length;

  function onNextStep(): void {
    console.log(Object.keys(Steps)[stepsLength - 1]);
    Object.keys(Steps)


    setStepIndex(stepIndex + 1);
  }

  function onPreviusStep(): void {
    setStepIndex(stepIndex - 1);

  }

  function SetStepFormData(stepKey: string, formData: any): any {
    setFormData(old => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      old.Steps[stepKey] = formData;
      return old;
    });
  }

  function useStepActions<TFormData extends DynamicFormStruct>(stepKey: string, initailData: TFormData): [TFormData, (eventTarget: any) => void] {
    const [data, setData] = useState<TFormData>({} as TFormData);

    if (initailData && Object.keys(initailData).length !== 0 && Object.keys(data).length === 0) {
      setData(initailData)
    }

    useEffect(() => {
      SetStepFormData(stepKey, data);
    }, [data]);

    function onChange(eventTarget: EventTarget & HTMLInputElement): void {
      setData(old => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        old[eventTarget.id] = eventTarget.value;
        return {
          ...old
        }
      });
    }

    return [data, onChange];
  }

  return (
    <div>
      {Steps[stepIndex]({ useStepActions })}
      <button onClick={onPreviusStep}>Previus</button>
      <button onClick={onNextStep}>Next</button>
    </div>
  );
}