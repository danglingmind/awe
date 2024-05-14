import { Testimonial } from "@prisma/client";

export interface TestimonialComponentProps {
  testimonial: Testimonial;
}
export default function TestimonialComponent(props: TestimonialComponentProps) {
  return (
    <div className="flex flex-col  bg-slate-400 m-5">
      <h1>Edit Testimonial</h1>
      <p>{props?.testimonial?.Name}</p>
    </div>
  );
}
