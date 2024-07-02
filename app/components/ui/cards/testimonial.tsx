"use client";
import { Testimonial } from "@prisma/client";
import { Code } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cardStyles } from "../styles";
import { useSession } from "next-auth/react";

export default function TestimonialCard({
  testimonial,
  cardSize,
}: {
  testimonial: Testimonial;
  cardSize: string;
}) {
  const link = "/dashboard/testimonials/testimonial?id=" + testimonial.id;
  const session = useSession();
  return (
    <div
      className="shadow-xl"
      style={{
        ...cardStyles[cardSize],
        ...cardStyles.card,
      }}
    >
      <div className="">
        <Link key={testimonial.id} href={link}>
          <div
            key={"person-info"}
            className="flex flex-row gap-2 max-w-11/12 m-1"
          >
            <Image
              alt="testimonial-owner-image"
              src={session?.data?.user?.image ?? ""}
              width={40}
              height={40}
              className="rounded-full w-10 h-10"
            />
            <div className="flex flex-col text-sm text-wrap overflow-clip">
              <div
                key={"person-name"}
                className="font-semibold text-xs capitalize text-wrap max-w-full"
              >
                {testimonial.name}
              </div>
              <div
                key={"person-email"}
                className="font-light text-xs break-all"
              >
                {testimonial.createdByEmail}
              </div>
            </div>
          </div>
          <div
            key={"feedback"}
            className="p-3 mx-1 my-2 text-xs max-h-72 min-h-10 text-wrap overflow-hidden text-ellipsis"
          >
            {testimonial?.feedback}
          </div>
        </Link>
        <div className="flex flex-row items-center justify-between my-3 text-xs">
          <span className=""> {`+ ${testimonial.answers.length} answers`}</span>
          <span>
            {testimonial.rating && (
              <div className="flex gap-1 items-baseline">
                <div>{testimonial.rating}</div>
                <div className="rating rating-xs">
                  <input type="radio" className="mask mask-star-2 mask-sm" />
                </div>
              </div>
            )}
          </span>
          <div
            className="rounded-full tooltip tooltip-right z-10"
            data-tip="copy embed code"
          >
            <Code className="w-3 h-3 rounded-full" data-tip="copy embed code" />
          </div>
        </div>
      </div>
    </div>
  );
}
