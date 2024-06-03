import { useEffect, useRef, useState } from "react";
import { Placeholders } from "../../constants";
import { SubmitButton } from "../../common/submit-button";
import updateForm, {
  createTestimonialForm,
} from "@/app/lib/actions/form.actions";
import { useSession } from "next-auth/react";
import { Board, Form, Prisma, Question, Tag } from "@prisma/client";
import { getAllUserBoards } from "@/app/lib/actions/board.actions";
import Select from "react-select";
import { getTags } from "@/app/lib/actions/tag.actions";

type BoardOption = {
  label: string;
  value: string;
};

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
  const [questions, setQuestions] = useState<Question[]>(form?.questions ?? []);
  const [customQueInput, setCustomQueInput] = useState<string>("");
  const session = useSession();
  const formRef = useRef<HTMLFormElement>(null);
  const [refresh, setRefresh] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    // get all the boards
    const fetchBoardsData = async () => {
      const data = await getAllUserBoards(session.data?.user?.id);
      setBoards(data);
    };
    // get all the tags
    const fetchTagsData = async () => {
      const data = await getTags();
      setTags(data);
    };
    if (session) {
      fetchBoardsData();
      fetchTagsData();
    }
  }, [session]);

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  const clearForm = async () => {
    setQuestions([]);
    setCustomQueInput("");
    formRef.current?.reset();
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: customQueInput } as Question]);
    setCustomQueInput("");
  };

  const removeQuesion = (queId: number) => {
    const newList = questions.filter((que, index) => queId !== index);
    setQuestions(newList);
  };

  const prepareCreateFormPayload = (
    formData: FormData
  ): Prisma.FormCreateInput => {
    const questionsCreate = formData.getAll("question").map((que) => {
      return {
        question: String(que),
        active: true,
      };
    });

    // prepare board
    const newSelectedBoards: { id: string }[] = [];
    formData.getAll("board").forEach((b) => {
      if (b.toString().trim()) {
        newSelectedBoards.push({ id: b.toString() });
      }
    });

    const data: Prisma.FormCreateInput = {
      title: formData?.get("title")?.toString() ?? "",
      description: formData.get("thoughts")?.toString() ?? "",
      enableImageUpload: Boolean(formData.get("enable_image")) ?? false,
      enableVideoUpload: Boolean(formData.get("enable_video")) ?? false,
      enableRating: Boolean(formData.get("enable_rating")) ?? false,
      questions: { create: questionsCreate },
      createdBy: {
        connect: {
          id: session?.data?.user?.id ?? "",
        },
      },
      boards: { connect: newSelectedBoards },
    };

    return data;
  };

  const prepareUpdateFormPayload = (
    formData: FormData
  ): Prisma.FormUpdateInput => {
    // prepare questions
    const questionConnects: { id: string }[] = [];
    const questionCreates: { question: string; active: boolean }[] = [];

    questions.map((que) => {
      que.id
        ? questionConnects.push({ id: que.id })
        : questionCreates.push({ question: que.question, active: true });

      return {
        where: {
          id: que.id,
        },
        create: {
          question: que.question,
        },
      };
    });

    // prepare boards
    const formBoards: string[] =
      form?.boards.map((board: Board) => board.id) ?? [];

    const newSelectedBoards: string[] = [];
    formData.getAll("board").forEach((b) => {
      if (b.toString().trim()) {
        newSelectedBoards.push(b.toString());
      }
    });

    const boardConnects: { id: string }[] = [];
    const boardDisconnects: { id: string }[] = [];

    if (newSelectedBoards.length === 0) {
      formBoards.map((board) => boardDisconnects.push({ id: board }));
    } else {
      // add new boards if not present
      newSelectedBoards.forEach((board) => {
        if (!formBoards.includes(board)) {
          boardConnects.push({ id: board });
        }
      });

      // remove boards if not selected
      formBoards.forEach((board) => {
        if (!newSelectedBoards.includes(board)) {
          boardDisconnects.push({ id: board });
        }
      });
    }

    // prepare tags
    const formTags: string[] = form?.tags.map((tag: Tag) => tag.id) ?? [];

    const newSelectedTags: string[] = [];
    formData.getAll("tag").forEach((t) => {
      if (t.toString().trim()) {
        newSelectedTags.push(t.toString());
      }
    });

    const tagConnects: { id: string }[] = [];
    const tagDisconnects: { id: string }[] = [];

    if (newSelectedTags.length === 0) {
      formTags.map((tag) => tagDisconnects.push({ id: tag }));
    } else {
      // add new tags if not present
      newSelectedTags.forEach((tag) => {
        if (!formTags.includes(tag)) {
          tagConnects.push({ id: tag });
        }
      });

      // remove boards if not selected
      formTags.forEach((tag) => {
        if (!newSelectedTags.includes(tag)) {
          tagDisconnects.push({ id: tag });
        }
      });
    }

    const data: Prisma.FormUpdateInput = {
      title: formData.get("title")?.toString() ?? "",
      description: formData.get("thoughts")?.toString() ?? "",
      enableImageUpload: Boolean(formData.get("enable_image")) ?? false,
      enableVideoUpload: Boolean(formData.get("enable_video")) ?? false,
      enableRating: Boolean(formData.get("enable_rating")) ?? false,
      questions: { create: questionCreates, connect: questionConnects },
      createdBy: {
        connect: {
          id: session?.data?.user?.id ?? "",
        },
      },
      boards: {
        connect: boardConnects ?? [],
        disconnect: boardDisconnects ?? [],
      },
      tags: {
        connect: tagConnects ?? [],
        disconnect: tagDisconnects ?? [],
      },
    };
    console.log(data);

    return data;
  };

  const handleSubmit = (formData: FormData) => {
    // call server actions
    form?.id?.trim()
      ? updateForm(form.id, prepareUpdateFormPayload(formData), formData)
      : createTestimonialForm(prepareCreateFormPayload(formData));
    clearForm();
    onSubmit && onSubmit();
    refreshPage();
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
          className="flex flex-col gap-1 items-start card p-3 border border-slate-400 rounded-md"
        >
          <label className="label font-bold">Custom Questions</label>
          <div className="flex flex-col">
            {questions.map((q, index) => {
              return (
                <div key={index} className="flex gap-3 items-center m-2">
                  <div className="">{`=> ${q.question}`}</div>
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
        {/* board select */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{Placeholders.PICK_A_BOARD}</span>
          </div>
          <Select
            name="board"
            isMulti
            options={boards.map((board) => {
              return { label: board.name, value: board.id };
            })}
            defaultValue={
              form?.boards.map((board: Board) => {
                return { label: board.name, value: board.id };
              }) ?? []
            }
          />
        </label>

        {/* Tags select */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{Placeholders.PICK_A_TAG}</span>
          </div>
          <Select
            name="tag"
            isMulti
            options={tags.map((tag) => {
              return { label: tag.name, value: tag.id };
            })}
            defaultValue={
              form?.tags.map((tag: Board) => {
                return { label: tag.name, value: tag.id };
              }) ?? []
            }
          />
        </label>
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
