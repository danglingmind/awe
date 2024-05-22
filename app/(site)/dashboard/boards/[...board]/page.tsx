"use client";
import { getBoard } from "@/app/lib/actions/board.actions";
import { Board } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BoardPage() {
  const session = useSession();
  const searchParams = useSearchParams();
  const boardId = searchParams.get("id");
  const [board, setBoard] = useState<Board>();

  useEffect(() => {
    if (!session?.data?.user?.id) return;
    if (boardId === null) return;
    const fetchData = async () => {
      const data = await getBoard(boardId);
      setBoard(data);
      console.log(data);
    };

    fetchData();
  }, [session?.data?.user?.id, boardId]);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{board?.name}</h2>
          <p className="card-text">{board?.description}</p>
          {board?.testimonials?.map((testimonial) => (
            <p key={testimonial.id}>{testimonial.name}</p>
          ))}
        </div>
      </div>
    </>
  );
}
