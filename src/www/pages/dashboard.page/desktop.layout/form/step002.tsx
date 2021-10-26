import React from "react";
import { IStep } from "@/ui/components/form-progress-wizard/IStep";

interface FormData {
  Step002?: string;
}

export function Step002({ useStepActions }: IStep): JSX.Element {
  const [data, onChange] = useStepActions<FormData>("2", { Step002: "Hello corneta" });

  return (
    <div>
      <h1>Step002</h1>
      <input type="text" id="Step002" value={data.Step002} onChange={(e) => onChange(e.target)} />
    </div>
  )
}
