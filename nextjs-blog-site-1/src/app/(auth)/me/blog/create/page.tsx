"use client";
import TextEditor from "@/components/form/TextEditor";
import UploadAndPreviewImage from "@/components/form/upload-and-preview-image";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { postCategories } from "@/data";
import { uploadFileToCloundinary } from "@/lib/uploadFile";
import useBlogStore from "@/stores/blog-store";
import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, useState } from "react";

const BlogCreate = () => {
  const { addBlog } = useBlogStore();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const thumbnail = file
        ? await uploadFileToCloundinary(file)
        : formValue.thumbnail;

      addBlog({ ...data, thumbnail });
    },
    onSuccess: () => {
      // Invalidate and refetch
      toast({
        description: "Blog created successfully",
      });
      setFormValue({
        title: "",
        thumbnail: "",
        content: "",
        description: "",
        tags: "",
        category: "",
      });
      setFile(null);
    },
    onError(error) {
      toast({
        description: `Failed to create blog: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  //form action
  const [file, setFile] = useState<File | null>(null);
  const [formValue, setFormValue] = useState({
    title: "",
    thumbnail: "",
    content: "",
    description: "",
    tags: "",
    category: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ ...formValue });
  };

  if (mutation.isPending) return <Loader />;

  // render
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="flex flex-col gap-4"
      >
        <UploadAndPreviewImage data={formValue?.thumbnail} onUpload={setFile} />

        <Input
          placeholder="Title"
          type="text"
          name="title"
          value={formValue.title}
          onChange={handleChange}
          required
        />
        <Textarea
          placeholder="Content"
          name="content"
          value={formValue.content}
          onChange={handleChange}
        />
        <Select
          defaultValue={formValue.category}
          onValueChange={(e: any) =>
            setFormValue({ ...formValue, category: e })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {postCategories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <TextEditor
          placeholder="Description"
          value={formValue.description}
          onChange={(e) => setFormValue({ ...formValue, description: e })}
        />
        <Textarea
          placeholder="tag1, tag2, tag3"
          name="tags"
          value={formValue.tags}
          onChange={handleChange}
        />
        <Button disabled={mutation.isPending}>Submit</Button>
      </form>
    </div>
  );
};

export default BlogCreate;
