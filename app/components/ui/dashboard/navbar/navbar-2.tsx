"use client";
import Link from "next/link";
import { Avatar } from "./avatar";
import { signOut } from "next-auth/react";
import BoardsNavItem from "./boards-nav-item";
import TestimonialNavItem from "./testimonial-nav-item";
import NewButton from "../new-button";
import { ReactNode, useState } from "react";
import { Cloud } from "lucide-react";
import TestimonialModal from "./modal/testimonial-modal";
import TestimonialFormModal from "./modal/testimonial-form-modal";
import BoardFormModal from "./modal/board-modal";
import TagModal from "./modal/tag-modal";

export default function NavBar2() {
  const [showNewAweModal, setShowNewAweModal] = useState(false);
  const [showNewTagModal, setShowNewTagModal] = useState(false);
  const [showNewFromModal, setShowNewFormModal] = useState(false);
  const [showBoardFromModal, setShowBoardFormModal] = useState(false);

  const [navBarMenuItems, setNavBarMenuItems] = useState(
    new Map<string, any>([
      [
        "home",
        {
          name: "Home",
          link: "/dashboard",
          selection: "",
        },
      ],
      [
        "boards",
        {
          name: "Boards",
          link: "/dashboard/boards",
          selection: "",
        },
      ],
      [
        "forms",
        {
          name: "Forms",
          link: "/dashboard/forms",
          selection: "",
        },
      ],
      [
        "testimonials",
        {
          name: "Testimonials",
          link: "/dashboard/testimonials",
          selection: "",
        },
      ],
      [
        "tags",
        {
          name: "Tags",
          link: "/dashboard/tags",
          selection: "",
        },
      ],
    ])
  );

  function setItemSelectionActive(name: string) {
    navBarMenuItems.forEach((value, key) => {
      if (key === name) {
        setNavBarMenuItems(
          new Map(
            navBarMenuItems.set(key, {
              ...navBarMenuItems.get(key),
              selection: "active",
            })
          )
        );
      } else {
        setNavBarMenuItems(
          new Map(
            navBarMenuItems.set(key, {
              ...navBarMenuItems.get(key),
              selection: "",
            })
          )
        );
      }
    });
  }

  function GetMenu(): ReactNode {
    const li: ReactNode[] = [];
    navBarMenuItems.forEach((value, key) => {
      li.push(
        <li key={key}>
          <Link
            href={value.link}
            className={`${value.selection} label`}
            onClick={() => setItemSelectionActive(key)}
          >
            {value.name}
          </Link>
        </li>
      );
    });
    return <>{li}</>;
  }

  const [activeItem, setActiveItem] = useState(
    new Map<string, string>([
      ["home", ""],
      ["boards", ""],
      ["testimonials", ""],
      ["tags", ""],
      ["forms", ""],
    ])
  );

  function setActiveMenuItemClass(item: string) {
    activeItem.forEach((value, key) => {
      if (key === item) {
        setActiveItem(new Map(activeItem.set(key, "active")));
      } else {
        setActiveItem(new Map(activeItem.set(key, "")));
      }
    });
  }

  function toggleAweModal() {
    setShowNewAweModal(!showNewAweModal);
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
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
          >
            {/* <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li> */}
            <GetMenu />
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" href={"/dashboard"}>
          <Cloud />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <GetMenu />
        </ul>
      </div>
      <div className="navbar-end">
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
            className="btn btn-ghost btn-circle avatar"
          >
            <Avatar />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52"
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
    </div>
  );
}
