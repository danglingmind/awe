"use client";

import { getBoard } from "@/app/lib/actions/board.actions";
import { Answer, Board, Testimonial } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BoardView() {
  const searchParams = useSearchParams();
  const boardId = searchParams.get("id");
  const [board, setBoard] = useState<Board>();

  useEffect(() => {
    if (boardId === null) return;
    const fetchData = async () => {
      const data = await getBoard(boardId);
      setBoard(data);
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <div className="carousel rounded-box p-4 space-x-4">
      {board?.testimonials.map((testi: Testimonial) => {
        return (
          <div key={testi.id} className="carousel-item carousel-center">
            <div className="card w-96 bg-purple-300 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{testi.name}</h2>
                {testi.answers.map((ans: Answer) => {
                  return (
                    <div key={ans.id} className="border">
                      <p className="font-bold">Q. {ans.question.question} ?</p>
                      <p>Ans: {ans.answer}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
