import { Answer, Board, Tag, Testimonial } from "@prisma/client";
import { Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TestimonialCard(t: Testimonial) {
  const link = "/dashboard/testimonials/testimonial?id=" + t.id;
  return (
    <div className="card bg-neutral text-neutral-content shadow-xl max-w-xl max-h-xl">
      <div className="card-body">
        <Link key={t.id} href={link}>
          <div key={"person-info"} className="flex flex-row gap-4">
            <Image
              alt="testimonial-owner-image"
              src={"https://source.unsplash.com/random/56×56/?closeup,face"}
              width={40}
              height={40}
              className="rounded-full w-14"
            />
            <div className="flex flex-col gap-2">
              <div key={"person-name"}>{t.name}</div>
              <div key={"person-email"}>{t.createdByEmail}</div>
            </div>
          </div>
          <div
            key={"feedback"}
            className="border border-neutral-500 p-3 mt-2 rounded-lg text-sm"
          >
            {t?.feedback}
          </div>
        </Link>
        <div key={"que-count"} className="flex justify-between my-3">
          <div key={"tags"} className="flex flex-row gap-2 items-center">
            <div className="opacity-50 text-sm">tags: </div>
            {t.tags.map((tag: Tag) => (
              <div
                key={tag.id}
                className="badge badge-sm p-3"
                // style={{ background: tag.color }}
              >
                {tag.name}
              </div>
            ))}
          </div>
          {`+ ${t.answers.length} answers`}
        </div>

        <div className="flex justify-between">
          {t.boards.length > 0 && (
            <div key={"boards"} className="flex flex-row gap-2 items-center">
              <div className="opacity-50 text-sm">boards: </div>
              {t.boards.map((board: Board) => {
                const link = "/dashboard/boards/board?id=" + board.id;
                return (
                  <Link key={board.id} href={link}>
                    <div key={board.id} className="badge badge-sm p-3">
                      {board.name}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          <button
            className="btn btn-ghost rounded-full tooltip tooltip-right"
            data-tip="copy embed code"
          >
            <Link2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
