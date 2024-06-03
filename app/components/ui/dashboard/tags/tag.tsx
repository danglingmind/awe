import { Board, Tag } from "@prisma/client";
import { clear } from "console";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Placeholders } from "../../constants";
import { BoardModel, ThemeModel } from "@/app/lib/model/models";
import { createBoard, updateBoard } from "@/app/lib/actions/board.actions";
import { getAllThemes } from "@/app/lib/actions/theme.actions";
import Select from "react-select/base";
import { createTag } from "@/app/lib/actions/tag.actions";

export interface CreateTagFormProps {
  onSubmit?: () => void;
  onCancel?: () => void;
  /**
   * Optional form object, if provided then form will act as edit.
   */
  tag?: Tag;
}

const colorOptions = [
  { label: "Red", value: "#FF7E6B" },
  { label: "Green", value: "#A9F0D1" },
  { label: "Blue", value: "#72A1E5" },
  { label: "Yellow", value: "#f49d37" },
];

export function CreateTagForm({ onCancel, onSubmit, tag }: CreateTagFormProps) {
  const session = useSession();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    if (!session.data?.user?.id) throw new Error("User not found");
    const name = formData.get("name") as string;
    const color = formData.get("color") as string;

    const tag: Tag = {
      name: name,
      color: color,
      owner: { connect: { id: session.data?.user?.id ?? "" } },
    };

    await createTag(tag);

    clearForm();
    onSubmit && onSubmit();
  };
  const handleCancel = () => {
    clearForm();
    onCancel && onCancel();
  };
  const clearForm = async () => {
    formRef.current?.reset();
  };

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-2 justify-center w-full"
      onAbort={() => clearForm()}
      action={handleSubmit}
    >
      <input
        required
        type="text"
        name="name"
        className="input input-bordered input-sm w-full max-w-xs"
        placeholder={Placeholders.ENTER_NAME}
        defaultValue={tag?.name}
      />

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{Placeholders.PICK_A_COLOR}</span>
        </div>
        <select
          required
          name="color"
          className="select select-bordered select-sm"
        >
          {colorOptions.map((option, key) => (
            <option key={key} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {/* form controls  */}
      <div className="form-control flex flex-row gap-2 justify-end mt-4">
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
  );
}
