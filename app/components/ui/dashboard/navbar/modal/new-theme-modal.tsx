import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../../../common/modal";
import { CreateTagForm } from "../../tags/create-tag-form";
import { CreateThemeForm } from "../../theme/create-theme-form";

export interface NewThemeModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function NewThemeModal({
  visible,
  setVisible,
}: NewThemeModalProps) {
  const hideModal = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      header="Create a new theme"
      setVisible={setVisible}
    >
      <CreateThemeForm onSubmit={hideModal} onCancel={hideModal} />
    </Modal>
  );
}
