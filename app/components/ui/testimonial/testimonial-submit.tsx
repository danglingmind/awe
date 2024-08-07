import { Answer, Form, Prisma, Question, Testimonial } from "@prisma/client";
import RatingInput from "../common/rating";
import { createTestimonial } from "@/app/lib/actions/testimonial.actions";
import FileUpload from "../common/file-upload";
import { Placeholders } from "@/app/components/ui/constants";
import { useEffect, useState } from "react";
import Modal from "../common/modal";

export default function TestimonialSubmitFormComponent({
  form,
}: {
  form?: Form;
}) {
  console.log(form);
  const [answers, setAnswers] = useState<Map<string, Answer>>(
    new Map<string, Answer>()
  );
  const [submitClicked, setSubmitClicked] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [rating, setRating] = useState<number>();

  const handleSubmit = async (formData: FormData) => {
    if (!submitClicked) {
      await createTestimonial(prepareTestimonialData(formData));
      setSubmitSuccess(true);
      setSubmitClicked(true);
    }
  };

  const prepareTestimonialData = (formData: FormData) => {
    const ansCreateMany: {
      answer: string;
      questionID: string;
    }[] = [];
    answers.forEach((ans: Answer, queID: string) => {
      ansCreateMany.push({ answer: ans.answer, questionID: queID });
    });

    let testimonial: Prisma.TestimonialCreateInput = {
      active: true,
      createdByEmail: formData.get("email")?.toString() ?? "",
      name: formData.get("name")?.toString() ?? "",
      feedback: formData.get("feedback")?.toString() ?? "",
      permissionToShare:
        formData.get("permissionToShare")?.toString() === "on" ? true : false,
      verified: true,
      owner: { connect: { id: form?.userId ?? "" } },
    };

    if (form?.boardIDs?.length) {
      testimonial = {
        ...testimonial,
        boards: { connect: form?.boardIDs?.map((id) => ({ id })) ?? [] },
      };
    }

    if (form?.tagIDs?.length) {
      testimonial = {
        ...testimonial,
        tags: { connect: form?.tagIDs?.map((id) => ({ id })) ?? [] },
      };
    }

    if (ansCreateMany.length) {
      testimonial = {
        ...testimonial,
        answers: { createMany: { data: ansCreateMany } },
      };
    }

    if (form?.enableRating) {
      testimonial = {
        ...testimonial,
        rating: rating ?? 0,
      };
    }
    // take the image file
    if (form?.enableImageUpload) {
    }
    // take the video file
    if (form?.enableVideoUpload) {
    }

    return testimonial;
  };

  return (
    form && (
      <>
        <div className="bg-base-100 py-10 mx-auto flex flex-col gap-3 justify-center items-center rounded-md">
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
              <div
                key={"mendetory-fields"}
                className="flex flex-col gap-3 justify-center mt-3 mb-3 w-2/3"
              >
                <div className="flex flex-row gap-3 justify-center mt-3 mb-3">
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Name"
                    className="input input-bordered input-sm grow"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    className="input input-bordered input-sm grow"
                  />
                </div>
                <textarea
                  required
                  name="feedback"
                  placeholder="Please give a feedback !!"
                  className="textarea textarea-bordered textarea-sm"
                />
              </div>

              {form.questions?.map((que: Question) => (
                <div key={que.id} className="flex flex-col w-2/3 my-1">
                  <div className="label text-sm">{`${que.question} ?`}</div>
                  <textarea
                    required
                    name={que.id}
                    className="textarea textarea-bordered textarea-sm"
                    onInput={(e) => {
                      setAnswers(
                        answers.set(que.id, {
                          questionID: que.id,
                          answer: e.currentTarget.value,
                        } as Answer)
                      );
                    }}
                  />
                </div>
              ))}

              {/* show rating */}
              {form.enableRating && (
                <div className="my-2 flex flex-row items-center gap-5">
                  {/* <label className="form-control"> */}
                  <div className="label">
                    <span className="label-text">Rate your experience</span>
                  </div>
                  <RatingInput rating={rating} setRating={setRating} />
                  {/* </label> */}
                </div>
              )}
              {/* show image upload */}
              {form.enableImageUpload && (
                <div className="my-2">
                  <FileUpload
                    name="image"
                    label="Pick an image for testimonial"
                  />
                </div>
              )}
              {/* show video upload */}
              {form.enableVideoUpload && (
                <div className="mt-3 mb-3">
                  <FileUpload
                    name="video"
                    label="Pick a video for testimonial"
                  />
                </div>
              )}

              <label className="label cursor-pointer flex gap-2 mt-8 mb-2">
                <input
                  type="checkbox"
                  name="share-permission"
                  className="checkbox"
                />
                <span className="label-text">
                  {Placeholders.SHARE_PERMISSION}
                </span>
              </label>
              <button
                type="submit"
                className="btn btn-primary w-fit"
                disabled={submitClicked}
              >
                Submit
              </button>
            </form>
          )}
        </div>
        {submitSuccess && (
          <Modal visible={submitSuccess} bg="bg-success">
            <div className="p-6 items-center justify-center flex text-2xl">
              <span>Testimonial sent successfully.</span>
            </div>
          </Modal>
        )}
      </>
    )
  );
}
