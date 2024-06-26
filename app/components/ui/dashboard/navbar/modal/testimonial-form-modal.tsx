import { Dispatch, SetStateAction, useState } from "react";
import { CreateAweForm } from "../../forms/create-awe-form";
import Modal from "../../../common/modal";

export interface TestimonialFormModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function TestimonialFormModal({
  visible,
  setVisible,
}: TestimonialFormModalProps) {
  const hideModal = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      header="Create a new AWE form"
      setVisible={setVisible}
    >
      <CreateAweForm onSubmit={hideModal} onCancel={hideModal} />
    </Modal>
  );
}
