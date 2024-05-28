import { Answer, Form, Question, Testimonial } from "@prisma/client";
import RatingInput from "../common/rating";
import {
  createTestimonial,
  testForm,
} from "@/app/lib/actions/testimonial.actions";
import FileUpload from "../common/file-upload";
import { Placeholders } from "@/app/components/ui/constants";
import { useState } from "react";
import test from "node:test";
import { create } from "domain";
import { connect } from "http2";
import { Questrial } from "next/font/google";

export default function TestimonialSubmitFormComponent({
  form,
}: {
  form?: Form;
}) {
  const [answers, setAnswers] = useState<Map<String, Answer>>(
    new Map<String, Answer>()
  );

  const handleSubmit = async (formData: FormData) => {
    await createTestimonial(prepareTestimonialData(formData));
  };

  const prepareTestimonialData = (formData: FormData) => {
    const ansCreateMany: {
      answer: string;
      questionID: String;
    }[] = [];
    answers.forEach((ans: Answer, queID: String) => {
      ansCreateMany.push({ answer: ans.answer, questionID: queID });
    });

    const testimonial: Testimonial = {
      active: true,
      createdByEmail: formData.get("email")?.toString() ?? "",
      name: formData.get("name")?.toString() ?? "",
      permissionToShare:
        formData.get("permissionToShare")?.toString() === "on" ? true : false,
      verified: true,
      owner: { connect: { id: form?.userId ?? "" } },
      boards: { connect: form?.boardIDs?.map((id) => ({ id })) ?? [] },
      tags: { connect: form?.tagIDs?.map((id) => ({ id })) ?? [] },
      answers: { createMany: { data: ansCreateMany } },
    };

    // take the ratings
    if (form?.enableRating) {
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
            <div className="flex flex-row gap-3 justify-center mt-3 mb-3 w-2/3">
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="input input-bordered input-sm grow"
              />
              <input
                name="name"
                type="text"
                required
                placeholder="Name"
                className="input input-bordered input-sm grow"
              />
            </div>
            {form.questions?.map((que: Question) => (
              <div key={que.id} className="flex flex-col w-2/3 my-1">
                <div className="label text-sm">{`${que.question} ?`}</div>
                <textarea
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
                <RatingInput />
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
                <FileUpload name="video" label="Pick a video for testimonial" />
              </div>
            )}

            <div className="flex gap-2 mt-8 mb-2">
              <input type="checkbox" name="share-permission" />
              <label className="label-text">
                {Placeholders.SHARE_PERMISSION}
              </label>
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
