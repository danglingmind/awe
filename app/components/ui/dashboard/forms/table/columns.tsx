import { Form } from "@prisma/client";
import { createColumnHelper, useReactTable } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Form>();

export const FORMS_TABLE_COLUMNS = [
  columnHelper.accessor((row) => row.title, {
    id: "title",
    cell: (info) => info.getValue(),
    header: () => <span>Title</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.description, {
    id: "desc",
    cell: (info) => info.getValue(),
    header: () => <span>Description</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.enableRating, {
    id: "rating",
    cell: (info) => {
      console.log(info);
    },
    header: () => <span>Enable Rating</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.enableImageUpload, {
    id: "imageUpload",
    cell: (info) => info.getValue(),
    header: () => <span>Upload Image</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.enableVideoUpload, {
    id: "videoUpload",
    cell: (info) => info.getValue(),
    header: () => <span>Video Image</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.tags, {
    id: "tags",
    cell: (info) => info.getValue(),
    header: () => <span>Tags</span>,
    footer: (info) => info.column.id,
  }),
];
