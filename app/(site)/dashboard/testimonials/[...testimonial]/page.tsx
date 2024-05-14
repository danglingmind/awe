"use client";
import { isIdValid } from "@/app/lib/utils";
import TestimonialComponent from "@/app/components/ui/dashboard/testimonial.component";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getTestimonialForUser } from "@/app/lib/actions/testimonial.actions";
import { Suspense, useEffect, useState } from "react";

export default function TestimonialPage() {
  const [testimonial, setTestimonial] = useState<any>();
  const searchParams = useSearchParams();
  const testimonialId: string = searchParams.get("id") ?? "";
  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTestimonialForUser(
        testimonialId,
        session.data?.user?.id
      );
      setTestimonial(data);
    };

    if (testimonialId && session.data?.user?.id) {
      fetchData();
    }
  }, [testimonialId, session.data?.user?.id]);

  // TODO: useSuspense fallback correction

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <TestimonialComponent testimonial={testimonial} />
    </Suspense>
  );
}
