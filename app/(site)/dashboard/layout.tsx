import { ReactNode } from "react";
import SideNav from "@/app/components/ui/dashboard/sideNav";
import NavBar from "../../components/ui/dashboard/navbar/navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <NavBar />
      <SideNav>{children}</SideNav>
    </div>
  );
}
