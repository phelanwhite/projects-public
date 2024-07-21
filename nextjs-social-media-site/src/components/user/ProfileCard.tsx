import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProfileCard = () => {
  return (
    <div className="bg-white shadow rounded p-4">
      <div className="relative">
        <div className="relative h-28 overflow-hidden rounded">
          <Image
            loading="lazy"
            alt=""
            fill
            src={`https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1c11a64e-b138-445b-b89f-b69755e09685/dg5hwoc-cbd45ce4-ac59-4f5d-ae37-33b447eac0cf.png/v1/fit/w_828,h_474,q_70,strp/samurai_wallpaper_by_definesleep_dg5hwoc-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzMyIiwicGF0aCI6IlwvZlwvMWMxMWE2NGUtYjEzOC00NDViLWI4OWYtYjY5NzU1ZTA5Njg1XC9kZzVod29jLWNiZDQ1Y2U0LWFjNTktNGY1ZC1hZTM3LTMzYjQ0N2VhYzBjZi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.QYxwo5p9cersF8X86RAp7Y3tO2j11Y9PmkuN180eDQk`}
          />
        </div>
        <div className="absolute -bottom-10 left-[50%] -translate-x-[50%] w-20 h-20 overflow-hidden rounded-full border-4 border-white">
          <Image
            loading="lazy"
            alt=""
            fill
            src={`https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0a98aa2b-034f-46b9-8617-5f5a52a0affc/dhe151c-42e0b244-4457-48cf-bf4b-c9f8d4363143.jpg/v1/fill/w_894,h_894,q_70,strp/samurai_standing_at_a_sunset_with_a_katana__by_tizioitaliano1_dhe151c-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzBhOThhYTJiLTAzNGYtNDZiOS04NjE3LTVmNWE1MmEwYWZmY1wvZGhlMTUxYy00MmUwYjI0NC00NDU3LTQ4Y2YtYmY0Yi1jOWY4ZDQzNjMxNDMuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.aNe_U3iajwH7wDrBRAC6KA5AtF9EvfVDN66gel8toEg`}
          />
        </div>
      </div>
      <div className="text-center mt-11 space-y-2">
        <div className="font-semibold line-clamp-1">Useful Links</div>
        <div className="text-gray-500 text-sm">140 Followers</div>
        <div>
          <Link href={`/profile`}>
            <Button size={"sm"}>My Profile</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
