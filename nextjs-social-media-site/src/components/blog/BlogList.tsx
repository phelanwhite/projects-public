import React from "react";
import BlogCard from "./BlogCard";

const BlogList = () => {
  return (
    <div className="space-y-4">
      {Array(20)
        .fill(0)
        .map((item: any, i) => (
          <BlogCard key={i} />
        ))}
    </div>
  );
};

export default BlogList;
