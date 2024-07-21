"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { addBlog } from "@/lib/actions";

const blogStatus = [
  { label: "Public", value: "public" },
  { label: "Friends", value: "friends" },
  { label: "Only Me", value: "only_me" },
];

const BlogForm = () => {
  const [formValue, setFormValue] = useState({
    status: blogStatus[0].value,
    description: "",
  });
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addBlog(formValue, file);
    // setFormValue({ description: "", status: blogStatus[0].value });
  };

  const [file, setFile] = useState<any>();

  return (
    <div className="bg-white p-4 rounded max-w-[500px] w-full">
      <div className="font-semibold text-xl text-center pb-4 border-b">
        Create Post
      </div>
      <div>
        <form
          onSubmit={onSubmit}
          action=""
          method="post"
          className="flex flex-col gap-4"
        >
          <div className="flex items-start gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                loading="lazy"
                alt=""
                fill
                src={`https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1c11a64e-b138-445b-b89f-b69755e09685/dg5hwoc-cbd45ce4-ac59-4f5d-ae37-33b447eac0cf.png/v1/fit/w_828,h_474,q_70,strp/samurai_wallpaper_by_definesleep_dg5hwoc-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzMyIiwicGF0aCI6IlwvZlwvMWMxMWE2NGUtYjEzOC00NDViLWI4OWYtYjY5NzU1ZTA5Njg1XC9kZzVod29jLWNiZDQ1Y2U0LWFjNTktNGY1ZC1hZTM3LTMzYjQ0N2VhYzBjZi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.QYxwo5p9cersF8X86RAp7Y3tO2j11Y9PmkuN180eDQk`}
              />
            </div>
            <div>
              <div className="font-semibold">Trung Nghia</div>
              <select
                className="bg-stone-100 text-xs px-1 py-0.5 rounded cursor-pointer"
                name="status"
                id="status"
                value={formValue.status}
                onChange={handleInputChange}
              >
                {blogStatus.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <textarea
            name="description"
            id="description"
            rows={5}
            value={formValue.description}
            onChange={handleInputChange}
            placeholder="What's on your mind, Trung Nghia"
            className="w-full border-none outline-none resize-none"
          ></textarea>
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files?.[0]);
            }}
          />

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};
export default BlogForm;
