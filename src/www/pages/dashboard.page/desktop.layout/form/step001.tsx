import React from "react";
import { IStep } from "@/ui/components/form-progress-wizard/IStep";

interface FormData {
  Ola?: string;
  Test?: string;
}

export function Step001({ useStepActions }: IStep): JSX.Element {
  const [data, onChange] = useStepActions<FormData>("1", { Test: "Hello corneta" });

  return (
    <div className="flex flex-col justify-center items-center h-content-height">
      <button className="bg-btn-bg w-btn-width h-btn-height mb-btn-margin-bot shadow-btn-box-shadow rounded-btn-border-radius">Anúncio</button>
      <button className="bg-btn-bg w-btn-width h-btn-height mb-btn-margin-bot shadow-btn-box-shadow rounded-btn-border-radius">Resultado</button>
      {/* <input type="text" id="Ola" placeholder="Ola" value={data.Ola} onChange={(e) => onChange(e.target)} /> */}
    </div>
  )
}
