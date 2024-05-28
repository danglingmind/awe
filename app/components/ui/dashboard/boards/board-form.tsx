import { Board } from "@prisma/client";
import { clear } from "console";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Placeholders } from "../../constants";
import { BoardModel, ThemeModel } from "@/app/lib/model/models";
import { createBoard, updateBoard } from "@/app/lib/actions/board.actions";
import { getAllThemes } from "@/app/lib/actions/theme.actions";

export interface CreateBoardFormProps {
  onSubmit?: () => void;
  onCancel?: () => void;
  /**
   * Optional form object, if provided then form will act as edit.
   */
  board?: Board;
}

export function CreateBoardForm({
  onCancel,
  onSubmit,
  board,
}: CreateBoardFormProps) {
  const session = useSession();
  const formRef = useRef<HTMLFormElement>(null);
  const [userId, setUserId] = useState("");
  const [themes, setThemes] = useState<ThemeModel[]>([] as ThemeModel[]);

  // fetch all the themes
  useEffect(() => {
    session?.data?.user?.id && setUserId(session?.data?.user?.id);
    const fetchData = async () => {
      const data = await getAllThemes();
      setThemes(data);
    };

    if (session?.data?.user?.id) {
      fetchData();
    }
  }, [session?.data?.user?.id]);

  const clearForm = async () => {
    formRef.current?.reset();
  };

  const handleSubmit = (formData: FormData) => {
    const board: BoardModel = {} as BoardModel;

    board.name = formData.get("name")?.toString() ?? "";
    board.active = true;
    board.userId = userId;
    // get the theme
    const selectedTheme = themes
      .filter((v) => v.id === formData.get("theme")?.toString())
      .at(0);
    board.themes = selectedTheme ? [selectedTheme] : [];
    board.tags = [];

    // call server action
    board?.id?.trim() ? updateBoard(board) : createBoard(board);

    clearForm();
    onSubmit && onSubmit();
  };
  const handleCancel = () => {
    clearForm();
    onCancel && onCancel();
  };
  return (
    <form
      ref={formRef}
      className="flex flex-col gap-2 justify-center w-full"
      onAbort={() => clearForm()}
      action={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder={Placeholders.ENTER_NAME}
        defaultValue={board?.name}
        className="input input-bordered"
        required
      />
      {/* Theme selection */}
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Pick the theme for the board</span>
          <span className="label-text-alt">Alt label</span>
        </div>
        <select
          name="theme"
          className="select select-bordered"
          defaultValue={"Default"}
        >
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
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
