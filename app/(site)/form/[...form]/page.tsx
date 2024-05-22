"use client";
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
      console.log(response);
    };

    fetchData();
  }, [formId]);
  return (
    <div className="m-auto p-5 flex flex-col gap-3 justify-center items-center max-w-screen-lg rounded-md">
      <h1 className="font-bold text-2xl">{form?.title}</h1>
      <h2 className="font-normal text-xl">{form?.description}</h2>
      {form && (
        <form className="flex flex-col gap-3 w-full">
          {/* mendetory fields */}
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="input w-full"
          />
          <input
            name="name"
            type="text"
            required
            placeholder="Name"
            className="input w-full"
          />
          {form.questions?.map((que, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="label">{`${que} ?`}</div>
              <input type="text" className="input w-full" />
            </div>
          ))}

          <button type="submit" className="btn btn-primary w-fit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
