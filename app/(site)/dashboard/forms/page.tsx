"use client";
import { useSession } from "next-auth/react";
import { Form } from "@prisma/client";
import { useEffect, useState } from "react";
import { getAllFormsForUser, deleteForm } from "@/app/lib/actions/form.actions";
import Modal from "@/app/components/ui/common/modal";
import { CreateAweForm } from "@/app/components/ui/dashboard/forms/create-awe-form";
import { Eye, Pencil, Link, Delete, Trash } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FORMS_TABLE_COLUMNS } from "@/app/components/ui/dashboard/forms/table/columns";
import TestimonialSubmitFormComponent from "@/app/components/ui/testimonial/testimonial-submit";

export default function Forms() {
  const session = useSession();
  const [refresh, setRefresh] = useState(false);
  const [forms, setForms] = useState<Form[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState<Form>();

  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllFormsForUser(session?.data?.user?.id);
      setForms(data);
    };

    if (session?.data?.user?.id) {
      fetchData();
    }
  }, [session?.data?.user?.id, refresh]);

  const refreshData = () => {
    setRefresh(!refresh);
  };

  const openModal = (form: Form) => {
    setSelectedForm(form);
    setShowModal(true);
  };
  const closeModal = () => {
    setSelectedForm({} as Form);
    setShowModal(false);
  };

  const openPreviewModal = (form: Form) => {
    setSelectedForm(form);
    setShowPreviewModal(true);
  };
  const closePreviewModal = () => {
    setSelectedForm({} as Form);
    setShowPreviewModal(false);
  };

  const table = useReactTable({
    data: forms,
    columns: FORMS_TABLE_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
  });

  const deleteFormAction = async (formID: string) => {
    deleteForm(formID, session?.data?.user?.id ?? "");
    refreshData();
  };

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
                    <Link className="w-4 h-4" />
                  </button>
                </div>
                <div className="tooltip" data-tip="preview">
                  <button
                    className="btn btn-circle btn-sm"
                    onClick={() => openPreviewModal(form)}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                <div className="tooltip" data-tip="edit form">
                  <button
                    className="btn btn-circle btn-sm"
                    onClick={() => openModal(form)}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
                <div className="tooltip" data-tip="delete form">
                  <button
                    className="btn btn-circle btn-sm"
                    onClick={() => deleteFormAction(form?.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal
          outsideClick={false}
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
      {showPreviewModal && (
        <Modal
          visible={showPreviewModal}
          setVisible={setShowPreviewModal}
          header={"Testimonial Preview"}
        >
          <TestimonialSubmitFormComponent form={selectedForm} />
        </Modal>
      )}
    </>
  );
}
