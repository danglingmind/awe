/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import EditableCell from "@/app/components/tableEditable/text-input";
import EditableCheckbox from "@/app/components/tableEditable/checkbox";
import { getAllUserBoards } from "@/app/lib/actions/board.actions";
import { Board, Form, Tag, Testimonial, Theme, User } from "@prisma/client";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TextInputCell from "@/app/components/tableEditable/text-input";
import CheckboxCell from "@/app/components/tableEditable/checkbox";
import SelectCell from "@/app/components/tableEditable/select";

export type ITableBoardItem = {
  id: string;
  name: string;
  description: string;
  active: boolean;
  embedLink: string;
  userId: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  testimonialIDs: string;
  testimonials: Testimonial[];
  themeIDs: string;
  themes: Theme[];
  tagIDs: string;
  tags: Tag[];
  formIDs: string;
  forms: Form[];
};

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const columnHelper = createColumnHelper<Board>();

const columns = [
  columnHelper.accessor((row) => `${row.name}`, {
    id: "name",
    header: "Name",
    cell: TextInputCell,
    // cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor((row) => `${row.description}`, {
    id: "description",
    header: "Description",
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor((row) => `${row.active}`, {
    id: "active",
    header: "Active",
    cell: CheckboxCell,
  }),
  columnHelper.accessor((row) => `${row.themeIDs}`, {
    id: "themeIDs",
    header: "Themes",
    cell: SelectCell,
  }),
  columnHelper.accessor((row) => `${row.createdAt}`, {
    id: "createdAt",
    header: "Created At",
    cell: (info) => <div>{new Date(info.getValue()).toLocaleString()}</div>,
  }),
];

export default function Boards() {
  const session = useSession();
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUserBoards(session?.data?.user?.id);
      setBoards(data);
      console.log(data);
    };

    if (session?.data?.user?.id) {
      fetchData();
    }
  }, [session?.data?.user?.id]);

  // TODO: remove this later
  useEffect(() => {
    console.log(boards);
  }, [boards]);

  const table = useReactTable({
    data: boards,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setBoards((prev) =>
          prev.map((row, index) => {
            if (index == rowIndex) {
              if (columnId === "themeIDs") {
                return {
                  ...prev[rowIndex],
                  [columnId]: [value] as string[],
                };
              }

              return {
                ...prev[rowIndex],
                [columnId]: value,
              };
            } else {
              return row;
            }
          })
        );
      },
    },
  });

  return (
    <>
      <div className="text-4xl ml-5">Boards</div>
      <div className="flex flex-row gap-3 flex-wrap m-5">
        <div key={"table"}>
          <table className="table table-zebra">
            <thead className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="table-row">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="table-cell">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="table-row">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="table-cell">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
        </div>
        {/* {boards.map((board) => (
        <div
          key={board.id}
          className="border border-white rounded-lg p-4 w-[300px]"
        >
          <h2 className="text-lg font-bold mb-2">{board.name}</h2>
          <p className="text-gray-700 mb-4">{board.description}</p>
          {board.themes?.map((theme) => (
            <p key={theme.id}> {theme.name}</p>
          ))}
          <a
            href={`/dashboard/boards/board?id=${board.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            View Board
          </a>
        </div>
      ))} */}
      </div>
    </>
  );
}
