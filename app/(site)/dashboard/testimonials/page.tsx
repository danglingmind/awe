"use client";
import {
  getAllTestimonialsForUser,
  getFilteredTestimonial,
} from "@/app/lib/actions/testimonial.actions";
import TestimonialCard from "@/app/components/ui/cards/testimonial";
import { Board, Tag, Testimonial } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CSSProperties, Suspense, useEffect, useState } from "react";
import { containerStyle } from "@/app/components/ui/styles";
import { getTags } from "@/app/lib/actions/tag.actions";
import { getAllUserBoards } from "@/app/lib/actions/board.actions";
import { CircuitBoard, Tags } from "lucide-react";

const cardSizes = ["small", "medium", "large"];
const activeFilterClass = " bg-base-300 font-semibold";

export default function Testimonials() {
  const session = useSession();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [activeTagFilter, setActiveTagFilter] = useState<string[]>([]);
  const [activeBoardFilter, setActiveBoardFilter] = useState<string[]>([]);

  useEffect(() => {
    const fetchTestimonialsData = async () => {
      const data = await getAllTestimonialsForUser(session.data?.user?.id);
      setTestimonials(data);
    };

    const fetchTagsData = async () => {
      const data = await getTags();
      setTags(data);
    };

    const fetchBoardsData = async () => {
      const data = await getAllUserBoards();
      setBoards(data);
    };

    if (session.data?.user?.id) {
      fetchTestimonialsData();
      fetchTagsData();
      fetchBoardsData();
    }
  }, [session.data?.user?.id]);

  useEffect(() => {
    callGetFilteredTestimonial();
  }, [activeTagFilter, activeBoardFilter]);

  function callGetFilteredTestimonial() {
    const filters: { [key: string]: string[] } = {
      tags: activeTagFilter,
      boards: activeBoardFilter,
    };
    const filteredTestimonials = async () => {
      console.log(filters);
      const data = await getFilteredTestimonial(filters);
      console.log(data);
      setTestimonials(data);
    };

    filteredTestimonials();
  }

  function toggleTagsFilter(tagId: string) {
    if (activeTagFilter.includes(tagId)) {
      setActiveTagFilter([...activeTagFilter.filter((id) => tagId != id)]);
    } else {
      setActiveTagFilter([...activeTagFilter, tagId]);
    }
  }

  function toggleBoardsFilter(boardId: string) {
    if (activeBoardFilter.includes(boardId)) {
      setActiveBoardFilter([
        ...activeBoardFilter.filter((id) => boardId != id),
      ]);
    } else {
      setActiveBoardFilter([...activeBoardFilter, boardId]);
    }
  }

  return (
    <div className="relative">
      <Suspense fallback={<h1>Loading...</h1>}>
        {tags.length && (
          <div
            key={"tag-filters"}
            className="flex gap-3 my-2 items-center flex-wrap"
          >
            <Tags className="rounded-full mr-2" />
            {tags.map((tag) => {
              const activeColor = activeTagFilter.includes(tag.id)
                ? activeFilterClass
                : "";

              return (
                <button
                  key={tag.id}
                  onClick={() => toggleTagsFilter(tag.id)}
                  className={
                    "badge badge-lg p-3 text-xs capitalize" + activeColor
                  }
                >
                  {tag.name}
                </button>
              );
            })}
          </div>
        )}
        {boards.length && (
          <div
            key={"board-filters"}
            className="flex flex-wrap gap-3 mt-2 mb-4 items-center"
          >
            <CircuitBoard className="rounded-full mr-2" />
            {boards.map((board) => {
              const activeColor = activeBoardFilter.includes(board.id)
                ? activeFilterClass
                : "";
              return (
                <button
                  key={board.id}
                  onClick={() => toggleBoardsFilter(board.id)}
                  className={
                    "badge badge-lg p-3 text-xs capitalize" + activeColor
                  }
                >
                  {board.name}
                </button>
              );
            })}
          </div>
        )}
        <div className="w-full" style={{ ...containerStyle }}>
          {testimonials?.map((testimonial) => {
            let cardSize = "large";

            // get the feedback length
            const feedbackLength = testimonial.feedback?.length;
            if (feedbackLength <= 60) {
              cardSize = "xsmall";
            } else if (feedbackLength > 60 && feedbackLength <= 120) {
              cardSize = "small";
            } else if (feedbackLength > 120 && feedbackLength <= 280) {
              cardSize = "medium";
            } else {
              cardSize = "large";
            }
            return (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                cardSize={cardSize}
              />
            );
          })}
        </div>
      </Suspense>
    </div>
  );
}
