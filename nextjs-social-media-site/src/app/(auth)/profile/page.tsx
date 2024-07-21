import BlogButtonAdd from "@/components/blog/BlogButtonAdd";
import BlogList from "@/components/blog/BlogList";
import Image from "next/image";
import React from "react";

const Profile = () => {
  return (
    <div className="space-y-6">
      {/* top */}
      <div>
        <div className="relative">
          <div className="relative overflow-hidden rounded h-72">
            <Image
              loading="lazy"
              alt=""
              fill
              src={`https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1c11a64e-b138-445b-b89f-b69755e09685/dg5hwoc-cbd45ce4-ac59-4f5d-ae37-33b447eac0cf.png/v1/fit/w_828,h_474,q_70,strp/samurai_wallpaper_by_definesleep_dg5hwoc-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzMyIiwicGF0aCI6IlwvZlwvMWMxMWE2NGUtYjEzOC00NDViLWI4OWYtYjY5NzU1ZTA5Njg1XC9kZzVod29jLWNiZDQ1Y2U0LWFjNTktNGY1ZC1hZTM3LTMzYjQ0N2VhYzBjZi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.QYxwo5p9cersF8X86RAp7Y3tO2j11Y9PmkuN180eDQk`}
            />
          </div>
          <div className="absolute -bottom-20 left-[50%] -translate-x-[50%] w-40 h-40 overflow-hidden rounded-full border-4 border-white">
            <Image
              loading="lazy"
              alt=""
              fill
              src={`https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0a98aa2b-034f-46b9-8617-5f5a52a0affc/dhe151c-42e0b244-4457-48cf-bf4b-c9f8d4363143.jpg/v1/fill/w_894,h_894,q_70,strp/samurai_standing_at_a_sunset_with_a_katana__by_tizioitaliano1_dhe151c-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzBhOThhYTJiLTAzNGYtNDZiOS04NjE3LTVmNWE1MmEwYWZmY1wvZGhlMTUxYy00MmUwYjI0NC00NDU3LTQ4Y2YtYmY0Yi1jOWY4ZDQzNjMxNDMuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.aNe_U3iajwH7wDrBRAC6KA5AtF9EvfVDN66gel8toEg`}
            />
          </div>
        </div>
        <div className="mt-[90px] max-w-[500px] mx-auto space-y-2">
          <div className="font-semibold text-xl text-center">Jhon Kasuto</div>
          <div className="text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
            tenetur in blanditiis dolores excepturi aspernatur reiciendis odit
            dignissimos mollitia, amet adipisci repellendus fuga nisi non porro
            nemo ullam, exercitationem ab.
          </div>
          <div className="flex items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <span className="font-medium">124</span>
              <span className="text-sm">Posts</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-medium">124</span>
              <span className="text-sm">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-medium">124</span>
              <span className="text-sm">Following</span>
            </div>
          </div>
        </div>
      </div>
      {/* blog */}
      <BlogButtonAdd />
      <BlogList />
    </div>
  );
};

export default Profile;
