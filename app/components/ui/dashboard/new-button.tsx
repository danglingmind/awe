"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

export interface INewButtonProps {
  openNewAweModal: () => void;
  openNewBoardModal: () => void;
  openNewTagModal: () => void;
  openNewFormModal: () => void;
}

export default function NewButton({
  openNewAweModal,
  openNewBoardModal,
  openNewTagModal,
  openNewFormModal,
}: INewButtonProps) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <Plus />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <div className="" onClick={openNewBoardModal}>
            Board
          </div>
        </li>
        <li>
          <div className="" onClick={openNewAweModal}>
            Testimonial
          </div>
        </li>
        <li>
          <div className="" onClick={openNewTagModal}>
            Tag
          </div>
        </li>
        <li>
          <div className="" onClick={openNewFormModal}>
            Testimonial Form
          </div>
        </li>
      </ul>
    </div>
  );
}
