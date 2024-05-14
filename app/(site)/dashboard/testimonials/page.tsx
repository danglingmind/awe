"use client";
import { getAllTestimonialsForUser } from "@/app/lib/actions/testimonial.actions";
import TestimonialCard, {
  ITestimonialCard,
} from "@/app/components/ui/cards/testimonial";
import NewButton from "@/app/components/ui/dashboard/new-button";
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
    };

    if (session.data?.user?.id) {
      fetchData();
    }
  }, [session.data?.user?.id]);

  return (
    <div className="relative">
      <Suspense fallback={<h1>Loading...</h1>}>
        <div className="flex gap-3 m-5">
          {testimonials?.map((testimonial) => {
            const link =
              "/dashboard/testimonials/testimonial?id=" + testimonial.id;
            return (
              <Link key={testimonial.id + "_" + testimonial.Name} href={link}>
                <TestimonialCard
                  id={testimonial.id}
                  userId={testimonial.userId}
                  title={testimonial.Name ?? ""}
                  userName={testimonial.userId}
                  description={testimonial.Description ?? ""}
                  isNew={false}
                  tags={testimonial?.Tags?.map((t) => t.name)}
                />
              </Link>
            );
          })}
        </div>
      </Suspense>
    </div>
  );
}
function getTestimonialsForUser(id: string | undefined) {
  throw new Error("Function not implemented.");
}
