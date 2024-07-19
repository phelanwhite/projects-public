import { FormEvent, useState } from "react";
import { useAddCommentMutation } from "../stores/commentApi";

const CommentForm = ({ id, type }: { id: string; type: string }) => {
  const [addComment] = useAddCommentMutation();
  const [comment, setComment] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment({ id, type, comment });
    setComment("");
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="flex flex-col gap-4"
      >
        <textarea
          required
          rows={5}
          className="bg-transparent border outline-none rounded-md px-4 py-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button className="bg-blue-600 hover:bg-blue-500 text-white border outline-none rounded-md px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
