"use client";
import Link from "next/link";
import NewButton from "../new-button";
import { useState } from "react";
import TestimonialModal from "./modal/testimonial-modal";
import TestimonialFormModal from "./modal/testimonial-form-modal";
import { Avatar } from "./avatar";
import BoardFormModal from "./modal/board-modal";
import { signOut } from "next-auth/react";
import { Bell } from "lucide-react";

export default function NavBar() {
  const [showNewAweModal, setShowNewAweModal] = useState(false);
  const [showNewTagModal, setShowNewTagModal] = useState(false);
  const [showNewFromModal, setShowNewFormModal] = useState(false);
  const [showBoardFromModal, setShowBoardFormModal] = useState(false);

  function toggleAweModal() {
    setShowNewAweModal(!showNewAweModal);
    document.getElementById("new_awe_modal")?.showModal();
  }

  function openBoardFormModal() {
    setShowBoardFormModal(true);
  }

  function openTagModal() {
    setShowNewTagModal(true);
  }

  function openNewFormModal() {
    setShowNewFormModal(true);
  }

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/dashboard" className="btn btn-ghost text-xl">
            AWE
          </Link>
        </div>
        <div className="flex-none">
          <NewButton
            key={"new-button-navbar"}
            openNewAweModal={toggleAweModal}
            openNewBoardModal={openBoardFormModal}
            openNewTagModal={openTagModal}
            openNewFormModal={openNewFormModal}
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <Bell className="h-5 w-5" />
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <Avatar />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <Link href={"/settings"}>Settings</Link>
              </li>
              <li
                onClick={async () => {
                  await signOut({ redirect: true, callbackUrl: "/" });
                }}
              >
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <TestimonialModal />
      <TestimonialFormModal
        visible={showNewFromModal}
        setVisible={setShowNewFormModal}
      />
      <BoardFormModal
        visible={showBoardFromModal}
        setVisible={setShowBoardFormModal}
      />
    </div>
  );
}
