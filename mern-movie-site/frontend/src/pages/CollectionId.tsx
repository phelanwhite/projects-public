import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { collection_idApi } from "../services/tmdb";
import SlideCard from "../components/SlideCard";
import Loader from "../components/loader";
import CollectionIdBanner from "../components/CollectionIdBanner";

const CollectionId = () => {
  const { id } = useParams();
  const collection_id = useQuery({
    queryKey: [`collection_id`, id],
    queryFn: async () => {
      const response = await collection_idApi(id as string);
      return response;
    },
  });

  if (collection_id.isLoading) return <Loader />;
  return (
    <div>
      <CollectionIdBanner data={collection_id.data} />
      <div className="wrapper my-10 space-y-8">
        <SlideCard title="Parts" data={collection_id.data?.parts} />
      </div>
    </div>
  );
};

export default CollectionId;
