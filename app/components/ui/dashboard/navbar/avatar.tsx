import { useSession } from "next-auth/react";
import Image from "next/image";

export function Avatar() {
  const session = useSession();

  return session?.data?.user?.image ? (
    <div className="w-10 rounded-full">
      <Image
        alt="Profile picture avatar of user"
        src={session?.data?.user?.image}
        width={40}
        height={40}
      />
    </div>
  ) : session.data?.user?.name ? (
    <div className="avatar placeholder">
      <div className="bg-neutral text-neutral-content rounded-full w-10">
        <span>{session.data?.user?.name?.slice(0, 1)}</span>
      </div>
    </div>
  ) : (
    <div className="avatar placeholder">
      <div className="bg-neutral text-neutral-content rounded-full w-10">
        <span>G</span>
      </div>
    </div>
  );
}
