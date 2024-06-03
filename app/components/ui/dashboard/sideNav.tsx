"use client";
import Link from "next/link";
import { ReactNode } from "react";
import BoardsNavItem from "./navbar/boards-nav-item";
import TestimonialNavItem from "./navbar/testimonial-nav-item";
import FormsNavItem from "./navbar/forms-nav-item";
import {
  FilePen,
  GalleryHorizontalEnd,
  GalleryHorizontalEndIcon,
  Home,
  LogOut,
  Menu,
  MessageSquareMore,
  Tag,
} from "lucide-react";
import { Avatar } from "./navbar/avatar";
import SideMenu from "./SideMenu";

export default function SideNav({ children }: { children: ReactNode }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden mt-3 ml-3"
        >
          <Menu className="w-5 h-5" />
        </label>
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* <SideMenu /> */}
        <div
          className="flex flex-col gap-3 justify-between"
          style={{ height: "95vh" }}
        >
          <ul
            className="menu rounded-box mx-4 my-6 bg-base-200 flex flex-col gap-4"
            // style={{ height: "95vh" }}
          >
            {/* Sidebar content here */}
            <li>
              <div className="tooltip" data-tip="home">
                <Link href={"/dashboard"}>
                  <Home className="h-5 w-5" />
                </Link>
              </div>
            </li>
            <li>
              <div className="tooltip" data-tip="boards">
                <Link href={"/dashboard/boards"}>
                  <GalleryHorizontalEndIcon className="h-5 w-5" />
                </Link>
              </div>
            </li>
            <li>
              <div className="tooltip" data-tip="testimonials">
                <Link href={"/dashboard/testimonials"}>
                  <MessageSquareMore className="h-5 w-5" />
                </Link>
              </div>
            </li>
            <li>
              <div className="tooltip" data-tip="tags">
                <Link href={"/dashboard/tags"}>
                  <Tag className="h-5 w-5" />
                </Link>
              </div>
            </li>
            <li>
              <div className="tooltip" data-tip="forms">
                <Link href={"/dashboard/forms"}>
                  <FilePen className="h-5 w-5" />
                </Link>
              </div>
            </li>
            <li className="mt-40">
              <div className="tooltip" data-tip="logout">
                <Link href={"/api/auth/signout"}>
                  <LogOut className="h-5 w-5" />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
