import { getAllThemes } from "@/app/lib/actions/theme.actions";
import { ThemeModel } from "@/app/lib/model/models";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const SelectCell = ({ getValue, row, column, table }) => {
  const initialThemeID = getValue();
  const { updateData } = table.options.meta;
  const [value, setValue] = useState(initialThemeID ?? "None");
  const [themes, setThemes] = useState<ThemeModel[]>([] as ThemeModel[]);
  const [userId, setUserId] = useState("");

  const session = useSession();
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

  return (
    <select
      name="theme"
      className="select select-bordered select-sm"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        updateData(row.id, column.id, e.target.value);
      }}
    >
      <option key={"none"} value={"None"}>
        {"None"}
      </option>
      {themes.map((theme) => (
        <option key={theme.id} value={theme.id}>
          {theme.name}
        </option>
      ))}
    </select>
  );
};
export default SelectCell;
