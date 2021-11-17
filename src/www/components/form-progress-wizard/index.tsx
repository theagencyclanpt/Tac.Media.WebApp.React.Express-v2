/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { IStep, DynamicFormStruct } from "./IStep";
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

import "./style.scss";

interface FormProgressWizardProps {
  Id: string;
  Steps: {
    [key: string]: (props: IStep) => JSX.Element
  },
}

interface FormProgressWizardState {
  Steps: {
    [key: string]: DynamicFormStruct
  },
  NextButtonActive: boolean,
  BackButtonActive: boolean
}

export function FormProgressWizard({ Id, Steps }: FormProgressWizardProps): JSX.Element {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormProgressWizardState>({
    Steps: {},
    NextButtonActive: true,
    BackButtonActive: true,
  });
  const stepsLength = Object.keys(Steps).length;

  function onNextStep(): void {
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
    <div className="form-wizard-progress">
      <div className="title">
        <span >Tipo:</span>
      </div>
      <div className="content">
        {Steps[stepIndex]({ useStepActions })}
      </div>
      <div className="footer">
        <Button size="medium" onClick={onPreviusStep} disabled={!formData.NextButtonActive}>
          <ArrowBackIosIcon />
        </Button>
        {stepIndex + 1 + "/" + stepsLength}
        <Button size="medium" onClick={onNextStep} disabled={!formData.BackButtonActive}>
          <ArrowForwardIos />
        </Button>
      </div>
    </div>
  );
}