import React from "react";
import { IStep } from "@/ui/components/form-progress-wizard/IStep";

interface FormData {
  Ola?: string;
  Test?: string;
}

export function Step001({ useStepActions }: IStep): JSX.Element {
  const [data, onChange] = useStepActions<FormData>("1", { Test: "Hello corneta" });

  return (
    <div>
      <h1>Step001 123</h1>
      <input type="text" id="Test" value={data.Test} onChange={(e) => onChange(e.target)} />
      <h2>Ola</h2>
      <input type="text" id="Ola" placeholder="Ola" value={data.Ola} onChange={(e) => onChange(e.target)} />
    </div>
  )
}
