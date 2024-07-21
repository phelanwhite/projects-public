import Image from "next/image";
import React from "react";

const StoryButtonAdd = () => {
  return (
    <div className="overflow-hidden rounded-lg">
      <div className="cursor-pointer relative">
        <div className="relative aspect-thumbnail">
          <Image
            loading="lazy"
            alt=""
            fill
            src={`https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1c11a64e-b138-445b-b89f-b69755e09685/dg5hwoc-cbd45ce4-ac59-4f5d-ae37-33b447eac0cf.png/v1/fit/w_828,h_474,q_70,strp/samurai_wallpaper_by_definesleep_dg5hwoc-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzMyIiwicGF0aCI6IlwvZlwvMWMxMWE2NGUtYjEzOC00NDViLWI4OWYtYjY5NzU1ZTA5Njg1XC9kZzVod29jLWNiZDQ1Y2U0LWFjNTktNGY1ZC1hZTM3LTMzYjQ0N2VhYzBjZi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.QYxwo5p9cersF8X86RAp7Y3tO2j11Y9PmkuN180eDQk`}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2 pt-8 bg-stone-100 text-xs font-semibold text-center">
          <div className="bg-blue-600 text-white text-2xl w-10 h-10 rounded-full border-4 absolute -top-3.5 left-[50%] -translate-x-[50%] flex items-center justify-center leading-normal">
            +
          </div>
          Create Story
        </div>
      </div>
    </div>
  );
};

export default StoryButtonAdd;
