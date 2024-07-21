import BlogButtonAdd from "@/components/blog/BlogButtonAdd";
import BlogList from "@/components/blog/BlogList";
import StorySlide from "@/components/story/StorySlide";
import React from "react";

const Home = () => {
  return (
    <div className="space-y-6">
      <StorySlide />
      <BlogButtonAdd />
      <BlogList />
    </div>
  );
};

export default Home;
