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
    <div className="drawer lg:drawer-open shadow-md">
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
        <div className="flex flex-col gap-3 justify-between">
          <ul className="menu rounded-box mx-4 my-6 bg-base-300 flex flex-col gap-4">
            {/* Sidebar content here */}
            <li>
              <Link href={"/dashboard"} className="tooltip" data-tip="home">
                <Home className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/boards"}
                className="tooltip"
                data-tip="boards"
              >
                <GalleryHorizontalEndIcon className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/testimonials"}
                className="tooltip"
                data-tip="testimonials"
              >
                <MessageSquareMore className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/tags"}
                className="tooltip"
                data-tip="tags"
              >
                <Tag className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/forms"}
                className="tooltip"
                data-tip="forms"
              >
                <FilePen className="h-5 w-5" />
              </Link>
            </li>
            <li className="mt-52">
              <Link
                href={"/api/auth/signout"}
                className="tooltip"
                data-tip="logout"
              >
                <LogOut className="h-5 w-5" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
