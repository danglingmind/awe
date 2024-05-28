"use client";
import TestimonialSubmitFormComponent from "@/app/components/ui/testimonial/testimonial-submit";
import { getForm } from "@/app/lib/actions/form.actions";
import { Form } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TestimonialSubmitForm() {
  const path = usePathname();
  const splittedPath = path?.split("/");
  const formId = splittedPath?.[splittedPath?.length - 1];

  const [form, setForm] = useState<Form>();

  useEffect(() => {
    if (!formId) return;
    const fetchData = async () => {
      const response = await getForm(formId);
      response && setForm(response);
    };

    fetchData();
  }, [formId]);
  return (
    <div className="mx-32 px-48">
      <TestimonialSubmitFormComponent form={form} />
    </div>
  );
}
