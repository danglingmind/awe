export interface ITestimonialCard {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  isNew?: boolean;
  tags?: string[];
}

export default function TestimonialCard(props: ITestimonialCard) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          //   src={props?.imageUrl}
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Testimonial user image"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {props.title}
          {props?.isNew && <div className="badge badge-secondary">NEW</div>}
        </h2>
        <p>{props.description}</p>
        <div className="card-actions justify-end">
          {props.tags?.map((tag, index) => (
            <div key={`tag${index}`} className="badge badge-outline">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
