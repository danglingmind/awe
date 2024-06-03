import { Board, Tag, Testimonial } from "@prisma/client";

export interface TestimonialComponentProps {
  testimonial: Testimonial;
}
export default function TestimonialComponent({
  testimonial,
}: TestimonialComponentProps) {
  return (
    <>
      <h1>Edit Testimonial</h1>
      <div className="flex flex-col  bg-slate-400 m-5">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{testimonial?.name}</h2>
            {/* <h3>Boards</h3>
            {testimonial.boards.map((board: Board) => {
              <div>{board.name}</div>;
            })}
            <h3>Tags</h3>
            {testimonial.tags.map((tag: Tag) => {
              <div>{tag.name}</div>;
            })} */}
          </div>
        </div>
      </div>
    </>
  );
}
