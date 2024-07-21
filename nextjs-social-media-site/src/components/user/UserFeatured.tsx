import Image from "next/image";
import React from "react";

const FeaturedCard = () => {
  return (
    <div className="cursor-pointer">
      <div className="relative overflow-hidden rounded-lg aspect-thumbnail">
        <Image
          loading="lazy"
          alt=""
          fill
          src={`https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1c11a64e-b138-445b-b89f-b69755e09685/dg5hwoc-cbd45ce4-ac59-4f5d-ae37-33b447eac0cf.png/v1/fit/w_828,h_474,q_70,strp/samurai_wallpaper_by_definesleep_dg5hwoc-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzMyIiwicGF0aCI6IlwvZlwvMWMxMWE2NGUtYjEzOC00NDViLWI4OWYtYjY5NzU1ZTA5Njg1XC9kZzVod29jLWNiZDQ1Y2U0LWFjNTktNGY1ZC1hZTM3LTMzYjQ0N2VhYzBjZi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.QYxwo5p9cersF8X86RAp7Y3tO2j11Y9PmkuN180eDQk`}
        />
        <div className="absolute bottom-2 left-2 text-white text-sm">+2</div>
      </div>
      <div className="mt-1 text-center text-xs font-semibold line-clamp-2">
        Thanh xuan
      </div>
    </div>
  );
};

const FeaturedButtonAdd = () => {
  return (
    <div className="cursor-pointer">
      <div className="relative overflow-hidden rounded-lg aspect-thumbnail bg-stone-100 flex items-center justify-center">
        +
      </div>
      <div className="mt-1 text-center text-xs font-semibold line-clamp-2">
        New
      </div>
    </div>
  );
};

const UserFeatured = () => {
  return (
    <div className="bg-white shadow rounded p-4 space-y-4">
      <div className="font-semibold text-gray-500">User Featured</div>
      <div className="grid gap-2 grid-cols-3">
        <FeaturedButtonAdd />
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
      </div>
    </div>
  );
};

export default UserFeatured;
