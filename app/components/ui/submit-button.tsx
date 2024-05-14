"use client";

import { Children, ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className="btn btn-primary">
      {children}
    </button>
  );
}
