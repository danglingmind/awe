"use client";
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
    <div className="dropdown dropdown-end mt-3">
      <div tabIndex={0} role="button" className="btn m-1 btn-ghost text-2xl">
        +
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
