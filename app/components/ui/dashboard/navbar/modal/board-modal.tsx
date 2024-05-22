import { Dispatch, SetStateAction, useState } from "react";
import { CreateBoardForm } from "../../boards/board-form";
import Modal from "../../../common/modal";

export interface BoardFormModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function BoardFormModal({
  visible,
  setVisible,
}: BoardFormModalProps) {
  const hideModal = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      header="Create a new Board"
      setVisible={setVisible}
    >
      <CreateBoardForm onSubmit={hideModal} onCancel={hideModal} />
    </Modal>
  );
}
