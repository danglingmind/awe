import {
  FilePen,
  GalleryHorizontalEndIcon,
  Home,
  LogOut,
  LogOutIcon,
  MessageSquareMore,
  Tag,
} from "lucide-react";
import Link from "next/link";

export default function SideMenu() {
  return (
    <div className="flex flex-col gap-4 items-center m-6 py-5 rounded-box bg-base-300">
      {/* Menu item */}
      <div className="flex flex-col gap-6 justify-between">
        <Link href={"/dashboard"} className="btn btn-ghost">
          <Home className="h-5 w-5" />
        </Link>
        <Link href={"/dashboard/boards"} className="btn btn-ghost">
          <GalleryHorizontalEndIcon className="h-5 w-5" />
        </Link>
        <Link href={"/dashboard/testimonials"} className="btn btn-ghost">
          <MessageSquareMore className="h-5 w-5" />
        </Link>
        <Link href={"/dashboard/tags"} className="btn btn-ghost">
          <Tag className="h-5 w-5" />
        </Link>
        <Link href={"/dashboard/forms"} className="btn btn-ghost">
          <FilePen className="h-5 w-5" />
        </Link>
      </div>
      {/* gap */}
      <div style={{ height: "30vh" }}></div>
      {/* Lower items */}
      <div className="btn btn-ghost">
        <LogOutIcon className="w-5 h-5" />
      </div>
    </div>
  );
}
