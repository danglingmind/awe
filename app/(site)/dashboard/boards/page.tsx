"use client";
import { getAllUserBoards } from "@/app/lib/actions/board.actions";
import { Board } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Boards() {
  const session = useSession();
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUserBoards(session?.data?.user?.id);
      setBoards(data);
      console.log(data);
    };

    if (session?.data?.user?.id) {
      fetchData();
    }
  }, [session?.data?.user?.id]);

  return (
    <div className="flex flex-row gap-3 flex-wrap m-5">
      {boards.map((board) => (
        <div
          key={board.id}
          className="border border-white rounded-lg p-4 w-[300px]"
        >
          <h2 className="text-lg font-bold mb-2">{board.name}</h2>
          <p className="text-gray-700 mb-4">{board.description}</p>
          {board.themes?.map((theme) => (
            <p key={theme.id}> {theme.name}</p>
          ))}
          <a
            href={`/dashboard/boards/board?id=${board.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            View Board
          </a>
        </div>
      ))}
    </div>
  );
}
