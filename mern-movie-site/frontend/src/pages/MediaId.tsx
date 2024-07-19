import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  media_creditsApi,
  media_idApi,
  media_recommendationsApi,
  media_similarApi,
} from "../services/tmdb";
import { useParams, useSearchParams } from "react-router-dom";
import SlideCard from "../components/SlideCard";
import Loader from "../components/loader";
import MediaIdBanner from "../components/MediaIdBanner";
import CommentList from "../components/CommentList";

const MediaId = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const media_id = useQuery({
    queryKey: [`media_id`, id, searchParams.get(`media_type`)],
    queryFn: async () => {
      const response = await media_idApi(
        id as string,
        searchParams.get("media_type") as string
      );
      return response;
    },
  });
  const media_similar = useQuery({
    queryKey: [`media_similar`, id, searchParams.get(`media_type`)],
    queryFn: async () => {
      const response = await media_similarApi(
        id as string,
        searchParams.get("media_type") as string
      );
      return response;
    },
  });
  const media_recommendations = useQuery({
    queryKey: [`media_recommendationsApi`, id, searchParams.get(`media_type`)],
    queryFn: async () => {
      const response = await media_recommendationsApi(
        id as string,
        searchParams.get("media_type") as string
      );
      return response;
    },
  });
  const credits = useQuery({
    queryKey: [`credits `, id, searchParams.get(`media_type`)],
    queryFn: async () => {
      const response = await media_creditsApi(
        id as string,
        searchParams.get("media_type") as string
      );
      return response;
    },
  });
  const mediaData = useMemo(() => media_id.data, [media_id]);

  if (
    media_id.isLoading ||
    media_similar.isLoading ||
    media_recommendations.isLoading ||
    credits.isLoading
  )
    return <Loader />;

  return (
    <>
      <MediaIdBanner mediaData={media_id.data} />
      <div className="wrapper my-10 space-y-8">
        <SlideCard
          title="Cast"
          data={credits?.data?.cast}
          media_type={`character`}
        />
        <SlideCard
          title="seasons"
          data={mediaData?.seasons}
          media_type={searchParams.get("media_type") as string}
        />
        <SlideCard
          title="similar"
          data={media_similar.data?.results}
          media_type={searchParams.get("media_type") as string}
        />
        <SlideCard
          title="recommendations"
          data={media_recommendations.data?.results}
          media_type={searchParams.get("media_type") as string}
        />
        <CommentList
          type={media_id?.data?.media_type || searchParams.get("media_type")}
          id={id as string}
        />
      </div>
    </>
  );
};

export default MediaId;
