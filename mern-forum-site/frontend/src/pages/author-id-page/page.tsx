import PostCard from "@/components/common/PostCard";
import ReviewList from "@/components/common/ReviewList";
import { Button, Pagination } from "antd";

const AuthorIdPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-3 max-w-[700px] w-full mx-auto p-4 rounded-md bg-stone-100">
        <div className="w-12 h-12 overflow-hidden rounded-full">
          <img
            loading="lazy"
            src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*YN7o1xnDKw2QFXC1.jpg"
            alt=""
          />
        </div>
        <div>
          <div className="text-base font-semibold text-center">John Deep</div>
          <div className="text-xs text-secondary text-center">
            Collaborator & Editor
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 text-sm font-semibold">
          <div>11 follower</div>
          <div>11 following</div>
          <div>11 post</div>
        </div>
        <div className="italic text-center">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam
          quibusdam reiciendis amet nesciunt. Aliquam veritatis, nulla quaerat
          illum vero beatae, laboriosam aut excepturi qui architecto odio
          consequuntur perspiciatis, adipisci dolorum.
        </div>

        <Button type="primary">Follow</Button>
      </div>

      <div className="grid gap-x-8 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <PostCard isColumn={true} />
        <PostCard isColumn={true} />
        <PostCard isColumn={true} />
        <PostCard isColumn={true} />
        <PostCard isColumn={true} />
        <PostCard isColumn={true} />
        <PostCard isColumn={true} />
        <PostCard isColumn={true} />
        <PostCard isColumn={true} />
        <PostCard isColumn={true} />
        <PostCard isColumn={true} />
      </div>

      <div className="w-max mx-auto">
        <Pagination pageSize={10} total={1000} />
      </div>
      <ReviewList />
    </div>
  );
};

export default AuthorIdPage;
