"use client";
import { useSession } from "next-auth/react";
import { Form } from "@prisma/client";
import { useEffect, useState } from "react";
import { getAllFormsForUser } from "@/app/lib/actions/form.actions";
import Modal from "@/app/components/ui/common/modal";
import { CreateAweForm } from "@/app/components/ui/dashboard/forms/create-awe-form";
import { Eye, Pencil, Link } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FORMS_TABLE_COLUMNS } from "@/app/components/ui/dashboard/forms/table/columns";

export default function Forms() {
  const session = useSession();
  const [forms, setForms] = useState<Form[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState<Form>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllFormsForUser(session?.data?.user?.id);
      setForms(data);
    };

    if (session?.data?.user?.id) {
      fetchData();
    }
  }, [session?.data?.user?.id]);

  const openModal = (form: Form) => {
    setSelectedForm(form);
    setShowModal(true);
  };
  const closeModal = () => {
    setSelectedForm({} as Form);
    setShowModal(false);
  };

  const table = useReactTable({
    data: forms,
    columns: FORMS_TABLE_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {/* <div className="overflow-x-auto m-3 border border-white">
        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
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
              <tr key={row.id} className="hover">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      <div className="flex flex-row gap-3 flex-wrap m-5">
        {forms.map((form) => (
          <div
            id={form.id}
            key={form.id}
            className="card w-96 bg-base-100 shadow-xl"
          >
            <div className="card-body">
              <h2 className="card-title">{form.title}</h2>
              <p>{form.description}</p>
              <div className="card-actions justify-end">
                <div className="tooltip" data-tip="copy embed link">
                  <button
                    className="btn btn-circle btn-sm"
                    onClick={() => {
                      const baseUrl = window.location.origin;
                      navigator.clipboard.writeText(
                        `${baseUrl}/form/${form.id}`
                      );
                    }}
                  >
                    <Link />
                  </button>
                </div>
                <button className="btn btn-circle btn-sm">
                  <Eye />
                </button>
                <button
                  className="btn btn-circle btn-sm"
                  onClick={() => openModal(form)}
                >
                  <Pencil />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal
          visible={showModal}
          setVisible={setShowModal}
          header={"Edit Form"}
        >
          <CreateAweForm
            onCancel={closeModal}
            onSubmit={closeModal}
            form={selectedForm}
          />
        </Modal>
      )}
    </>
  );
}
