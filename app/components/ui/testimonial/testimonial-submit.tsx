import { Form } from "@prisma/client";
import RatingInput from "../common/rating";
import { testForm } from "@/app/lib/actions/testimonial.actions";
import FileUpload from "../common/file-upload";

export default function TestimonialSubmitFormComponent({
  form,
}: {
  form?: Form;
}) {
  const handleSubmit = async (formData: FormData) => {
    testForm(formData);
  };

  const createTestimonialData = (formData: FormData) => {};

  return (
    form && (
      <div className="py-10 mx-auto flex flex-col gap-3 justify-center items-center max-w-screen-lg rounded-md">
        <div className="avatar">
          <div className="w-24 rounded-full">
            {/* TODO: Get the image from the form */}
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <h1 className="font-bold text-2xl">{form?.title}</h1>
        <h2 className="font-normal text-xl">{form?.description}</h2>
        {form && (
          <form
            action={handleSubmit}
            className="flex flex-col gap-3 items-center w-full mt-7"
          >
            {/* mendetory fields */}
            <div className="flex flex-row gap-3 justify-center mt-3 mb-3 w-2/3">
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="input input-bordered grow"
              />
              <input
                name="name"
                type="text"
                required
                placeholder="Name"
                className="input input-bordered grow"
              />
            </div>
            {form.questions?.map((que, index) => (
              <div key={index} className="flex flex-col w-2/3 mt-2 mb-2">
                <div className="label">{`${que} ?`}</div>
                <textarea name={que} className="textarea textarea-bordered" />
              </div>
            ))}

            {/* show rating */}
            {form.enableRating && (
              <div className="mt-3 mb-3 flex flex-row items-center gap-5">
                {/* <label className="form-control"> */}
                <div className="label">
                  <span className="label-text">Rate your experience</span>
                </div>
                <RatingInput />
                {/* </label> */}
              </div>
            )}
            {/* show image upload */}
            {form.enableImageUpload && (
              <div className="mt-3 mb-3">
                <FileUpload
                  name="image"
                  label="Pick an image for testimonial"
                />
              </div>
            )}
            {/* show video upload */}
            {form.enableVideoUpload && (
              <div className="mt-3 mb-3">
                <FileUpload name="video" label="Pick a video for testimonial" />
              </div>
            )}

            <div className="flex gap-2 mt-8 mb-2">
              <input type="checkbox" name="share-permission" />
              <label>Share my testimonial with others.</label>
            </div>
            <button type="submit" className="btn btn-primary w-fit">
              Submit
            </button>
          </form>
        )}
      </div>
    )
  );
}
