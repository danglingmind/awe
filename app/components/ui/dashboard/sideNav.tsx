"use client";
import Link from "next/link";
import { ReactNode } from "react";
import BoardsNavItem from "./navbar/boards-nav-item";
import TestimonialNavItem from "./navbar/testimonial-nav-item";
import FormsNavItem from "./navbar/forms-nav-item";

export default function SideNav({ children }: { children: ReactNode }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        {/* Page content here */}
        {children}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          <li>
            <Link href={"/dashboard"}>Home</Link>
          </li>
          <li>
            <BoardsNavItem />
          </li>
          <li>
            <TestimonialNavItem />
          </li>
          <li>
            <Link href={"/dashboard/tags"}>Tags</Link>
          </li>
          <li>
            <FormsNavItem />
          </li>
        </ul>
      </div>
    </div>
  );
}
