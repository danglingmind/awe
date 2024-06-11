"use client";
import { Plus } from "lucide-react";
import { useState } from "react";
import BoardFormModal from "./navbar/modal/board-modal";
import TagModal from "./navbar/modal/tag-modal";
import TestimonialFormModal from "./navbar/modal/testimonial-form-modal";
import TestimonialModal from "./navbar/modal/testimonial-modal";

export default function NewButton() {
  const [showNewAweModal, setShowNewAweModal] = useState(false);
  const [showNewTagModal, setShowNewTagModal] = useState(false);
  const [showNewFromModal, setShowNewFormModal] = useState(false);
  const [showBoardFromModal, setShowBoardFormModal] = useState(false);

  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <Plus />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52"
        >
          <li>
            <div className="" onClick={() => setShowBoardFormModal(true)}>
              Board
            </div>
          </li>
          <li>
            <div className="" onClick={() => setShowNewAweModal(true)}>
              Testimonial
            </div>
          </li>
          <li>
            <div className="" onClick={() => setShowNewTagModal(true)}>
              Tag
            </div>
          </li>
          <li>
            <div className="" onClick={() => setShowNewFormModal(true)}>
              Testimonial Form
            </div>
          </li>
        </ul>
      </div>
      {/* Modals */}
      <TestimonialModal />
      <TestimonialFormModal
        visible={showNewFromModal}
        setVisible={setShowNewFormModal}
      />
      <BoardFormModal
        visible={showBoardFromModal}
        setVisible={setShowBoardFormModal}
      />
      <TagModal visible={showNewTagModal} setVisible={setShowNewTagModal} />
    </>
  );
}
