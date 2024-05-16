"use client";
import { useSession } from "next-auth/react";
import { Form } from "@prisma/client";
import { useEffect, useState } from "react";
import { getAllFormsForUser } from "@/app/lib/actions/form.actions";
import Modal from "@/app/components/ui/modal";
import { CreateAweForm } from "@/app/components/ui/create-awe-form";
import { Eye, Pencil } from "lucide-react";

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

  return (
    <>
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
