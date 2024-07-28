import BlogCard from "@/components/BlogCard";
import { authors, blogs, recommended_topics } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="flex items-start gap-20">
      <div className="flex-[2]">
        {blogs.map((item, index) => (
          <div key={index} className="pb-8 mb-8 border-b">
            <BlogCard data={item} />
          </div>
        ))}
      </div>
      {/* left */}
      <div className="flex-[1] space-y-8 hidden lg:block">
        {/* Recommended topics */}
        <div>
          <div className="font-medium ">Recommended topics</div>
          <div className="mt-4 flex flex-wrap gap-4">
            {recommended_topics.map((topic, index) => (
              <Link
                key={index}
                href={topic.link}
                className="text-xs bg-stone-100 rounded-full px-4 py-2"
              >
                {topic.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Who to follow */}
        <div>
          <div className="font-medium ">Who to follow</div>
          <div className="mt-4 flex flex-col gap-4">
            {authors.map((author, index) => (
              <Link
                key={index}
                href={author.name}
                className="flex items-start gap-4"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image fill alt="" src={author?.avatar} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{author.name}</div>
                  <div className="mt-1 line-clamp-2 text-xs text-gray-500">
                    {author?.short_bio}
                  </div>
                </div>
                <button className="px-3 py-1 rounded-full border text-xs hover:bg-stone-100">
                  Follow
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
