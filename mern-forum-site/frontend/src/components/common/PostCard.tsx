import { useMessageContext } from "@/contexts/MessageContext";
import { usePostStore } from "@/store/post-store";
import { changeTimeToString } from "@/utils/time";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdCalendarToday, MdOutlineModeComment } from "react-icons/md";
import { PiHandsClappingDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

export const PostCardOptions = () => {
  return (
    <div className="bg-white text-sm shadow-lg py-2 rounded-md border absolute w-[245px] right-0 bottom-0">
      <ul>
        <li>
          <button className="hover:bg-stone-100 w-full px-4 py-1 text-left">
            Save
          </button>
        </li>
        <li>
          <button className="hover:bg-stone-100 w-full px-4 py-1 text-left">
            Follow author
          </button>
        </li>
        <li>
          <button className="hover:bg-stone-100 w-full px-4 py-1 text-left">
            Report
          </button>
        </li>
      </ul>
    </div>
  );
};
export const PostCardAthOptions = ({ data }: { data: any }) => {
  const { messageApi } = useMessageContext();
  const { deletePostById } = usePostStore();
  const deletePostByIdResult = useMutation({
    mutationFn: async () => {
      const result = await deletePostById(data?._id);
      return result;
    },
    onSuccess(data) {
      messageApi.open({
        type: "success",
        content: data?.message,
      });
    },
    onError(error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });
  return (
    <div className="bg-white text-sm shadow-lg py-2 rounded-md border absolute w-[245px] right-0 bottom-0">
      <ul>
        <li>
          <button className="hover:bg-stone-100 w-full px-4 py-1 text-left">
            Save
          </button>
        </li>
        <li>
          <button
            onMouseDown={() =>
              window.location.replace(`/post-update-id/${data?._id}`)
            }
            className="hover:bg-stone-100 w-full px-4 py-1 text-left"
          >
            Update post
          </button>
        </li>
        <li>
          <button
            onMouseDown={() => deletePostByIdResult.mutate()}
            className="hover:bg-stone-100 w-full px-4 py-1 text-left"
          >
            Delete post
          </button>
        </li>
        <li>
          <button className="hover:bg-stone-100 w-full px-4 py-1 text-left">
            Report
          </button>
        </li>
      </ul>
    </div>
  );
};

const PostCard = ({
  isColumn,
  data,
  isAuth,
}: {
  isColumn?: boolean;
  data: any;
  isAuth?: boolean;
}) => {
  const [isOpenOptions, setIsOpenOptions] = useState(false);

  return (
    <div className="">
      <Link to={`/author/${data?._id}`}>
        <div className="flex items-center gap-1 text-xs">
          <div className="w-5 h-5 overflow-hidden rounded-full">
            <img loading="lazy" src={data?.author?.avatar} alt="" />
          </div>
          <span>{data?.author?.username}</span>
        </div>
      </Link>
      <div
        className={[
          `mt-3 flex items-start `,
          isColumn
            ? "flex-col-reverse gap-4"
            : `gap-6 md:gap-12 flex-col-reverse md:flex-row`,
        ].join(" ")}
      >
        <div className="space-y-3 flex-1 w-full">
          <Link to={`/post/${data?._id}`}>
            <div className="line-clamp-2 font-bold text-2xl leading-6 h-12">
              {data?.title}
            </div>
          </Link>
          <div className="line-clamp-2 leading-6 h-12">{data?.subTitle}</div>
          <div className="flex items-center justify-between text-secondary">
            <div className="flex items-center gap-4 text-xs ">
              <div className="flex items-center gap-1">
                <MdCalendarToday />
                <span>{changeTimeToString(new Date(data?.createdAt))}</span>
              </div>
              <div className="flex items-center gap-1">
                <PiHandsClappingDuotone />
                <span>{data?.count_vote}</span>
              </div>
              <div className="flex items-center gap-1">
                <MdOutlineModeComment />
                <span>{data?.count_comment}</span>
              </div>
            </div>
            <div className="relative">
              <button
                onFocus={() => setIsOpenOptions(true)}
                onBlur={() => setIsOpenOptions(false)}
              >
                <HiOutlineDotsHorizontal size={24} />
              </button>
              {isOpenOptions &&
                (isAuth ? (
                  <PostCardAthOptions data={data} />
                ) : (
                  <PostCardOptions />
                ))}
            </div>
          </div>
        </div>
        <div
          className={[
            "aspect-video w-full overflow-hidden",
            !isColumn && `md:max-w-[160px]`,
          ].join(" ")}
        >
          <img loading="lazy" src={data?.thumbnail} alt="" />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default PostCard;
