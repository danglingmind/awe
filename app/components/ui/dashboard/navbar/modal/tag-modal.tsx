import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../../../common/modal";
import { CreateTagForm } from "../../tags/tag";

export interface TagModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function TagModal({ visible, setVisible }: TagModalProps) {
  const hideModal = () => {
    setVisible(false);
  };

  return (
    <Modal visible={visible} header="Create a new tag" setVisible={setVisible}>
      <CreateTagForm onSubmit={hideModal} onCancel={hideModal} />
    </Modal>
  );
}
