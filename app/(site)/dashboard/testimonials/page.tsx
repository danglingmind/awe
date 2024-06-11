"use client";
import { getAllTestimonialsForUser } from "@/app/lib/actions/testimonial.actions";
import TestimonialCard from "@/app/components/ui/cards/testimonial";
import { Testimonial } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

export default function Testimonials() {
  const session = useSession();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTestimonialsForUser(session.data?.user?.id);
      setTestimonials(data);
      console.log(data);
    };

    if (session.data?.user?.id) {
      fetchData();
    }
  }, [session.data?.user?.id]);

  return (
    <div className="relative">
      <Suspense fallback={<h1>Loading...</h1>}>
        <div className="flex gap-3 m-5 flex-wrap">
          {testimonials?.map((testimonial) => {
            return <TestimonialCard key={testimonial.id} {...testimonial} />;
          })}
        </div>
      </Suspense>
    </div>
  );
}
function getTestimonialsForUser(id: string | undefined) {
  throw new Error("Function not implemented.");
}
