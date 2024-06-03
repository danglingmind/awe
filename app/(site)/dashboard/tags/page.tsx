"use client";

import { getTags } from "@/app/lib/actions/tag.actions";
import { Tag } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Tags() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTags();
      console.log(data);
      setTags(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {tags.map((tag) => (
        <div
          key={tag.id}
          className="badge"
          style={{ background: `${tag.color}` }}
        >
          {tag.name}
        </div>
      ))}
    </div>
  );
}
