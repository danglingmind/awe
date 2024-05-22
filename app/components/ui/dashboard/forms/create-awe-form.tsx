import { useRef, useState } from "react";
import { Placeholders } from "../../constants";
import { SubmitButton } from "../../common/submit-button";
import updateForm, {
  createTestimonialForm,
} from "@/app/lib/actions/form.actions";
import { useSession } from "next-auth/react";
import { Form } from "@prisma/client";

export interface CreateAweFormProps {
  onSubmit?: () => void;
  onCancel?: () => void;
  /**
   * Optional form object, if provided then form will act as edit.
   */
  form?: Form;
}

export function CreateAweForm({
  onCancel,
  onSubmit,
  form,
}: CreateAweFormProps) {
  const [questions, setQuestions] = useState<string[]>(form?.questions ?? []);
  const [customQueInput, setCustomQueInput] = useState<string>("");
  const session = useSession();
  const formRef = useRef<HTMLFormElement>(null);

  const clearForm = async () => {
    setQuestions([]);
    setCustomQueInput("");
    formRef.current?.reset();
  };

  const addQuestion = () => {
    setQuestions([...questions, customQueInput]);
    setCustomQueInput("");
  };

  const removeQuesion = (queId: number) => {
    const newList = questions.filter((que, index) => queId !== index);
    setQuestions(newList);
  };

  const handleSubmit = (formData: FormData) => {
    form?.id && formData.append("id", form?.id);
    formData.append("userId", session?.data?.user?.id ?? "");

    // prepare custom questions list
    questions?.map((que) => formData.append("question", que));

    // call server actions
    form?.id?.trim() ? updateForm(formData) : createTestimonialForm(formData);
    clearForm();
    onSubmit && onSubmit();
  };

  const handleCancel = () => {
    clearForm();
    onCancel && onCancel();
  };

  return (
    <>
      <form
        ref={formRef}
        className="flex flex-col gap-2 justify-center w-full"
        onAbort={() => clearForm()}
        action={handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder={Placeholders.ENTER_TESTIMONIAL_TITLE}
          defaultValue={form?.title}
          className="input input-bordered"
          required
        />
        <textarea
          name="thoughts"
          className="textarea textarea-bordered"
          placeholder={Placeholders.ENTER_YOUR_THOUGHTS}
          defaultValue={form?.description}
          required
        />

        {/* customized questions place */}
        <div
          id="added_que_list"
          className="flex flex-col gap-1 items-start card bg-neutral text-neutral-content p-3"
        >
          <label className="label font-bold">Custom Questions</label>
          <div className="flex flex-col">
            {questions.map((q, index) => {
              return (
                <div key={index} className="flex gap-3 items-center m-2">
                  <div className="">{`=> ${q}`}</div>
                  <div
                    className="btn btn-secondary btn-xs ml-auto"
                    onClick={() => removeQuesion(index)}
                  >
                    remove
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div id="add_que_section" className="min-w-full">
          <input
            type="text"
            name="custom_ques_input"
            placeholder={Placeholders.ADD_QUE}
            value={customQueInput}
            onChange={(e) => {
              setCustomQueInput(e.target.value);
            }}
            className="input input-bordered w-4/5"
          />
          <div
            className="btn btn-link btn-sm max-w-fit"
            onClick={() => addQuestion()}
          >
            + Add
          </div>
        </div>

        <div className="form-control max-w-md">
          <label className="label cursor-pointer">
            <span className="label-text">Enable rating</span>
            <input
              type="checkbox"
              name="enable_rating"
              defaultChecked={form?.enableRating ?? false}
              className="checkbox checkbox-primary"
            />
          </label>
        </div>
        <div className="form-control max-w-md">
          <label className="label cursor-pointer">
            <span className="label-text">Enable Image Upload</span>
            <input
              type="checkbox"
              name="enable_image"
              defaultChecked={form?.enableImageUpload ?? false}
              className="checkbox checkbox-primary"
            />
          </label>
        </div>
        <div className="form-control max-w-md">
          <label className="label cursor-pointer">
            <span className="label-text">Enable Video Upload</span>
            <input
              type="checkbox"
              name="enable_video"
              defaultChecked={form?.enableVideoUpload ?? false}
              className="checkbox checkbox-primary"
            />
          </label>
        </div>

        <div className="flex flex-row gap-2 justify-end mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
