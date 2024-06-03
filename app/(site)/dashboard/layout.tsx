import { ReactNode } from "react";
import SideNav from "@/app/components/ui/dashboard/sideNav";
import NavBar from "../../components/ui/dashboard/navbar/navbar";
import NavBar2 from "@/app/components/ui/dashboard/navbar/navbar-2";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* <NavBar /> */}
      {/* <NavBar2 /> */}
      {/* <div className="m-4">{children}</div> */}
      <SideNav>
        <div className="m-4">{children}</div>
      </SideNav>
    </div>
  );
}
