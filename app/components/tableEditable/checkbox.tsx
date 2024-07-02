import { useEffect, useState } from "react";

const CheckboxCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();

  const [value, setValue] = useState(Boolean(JSON.parse(initialValue)));

  // onChange, we'll call our table meta's updateData function
  const onChange = (value: boolean) => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      type="checkbox"
      className="checkbox checkbox-sm"
      defaultChecked={Boolean(value)}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
    />
  );
};
export default CheckboxCell;
