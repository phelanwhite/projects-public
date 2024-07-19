import { useQuery } from "@tanstack/react-query";
import {
  trending_allApi,
  trending_movie_top_ratedApi,
  trending_movieApi,
  trending_personApi,
  trending_tv_top_ratedApi,
  trending_tvApi,
} from "../services/tmdb";
import SlideCard from "../components/SlideCard";
import Loader from "../components/loader";
import HomeBannerSlide from "../components/HomeSlide";

const Home = () => {
  const trending_person = useQuery({
    queryKey: ["trending_person"],
    queryFn: async () => await trending_personApi(),
  });
  const trending_all = useQuery({
    queryKey: ["trending_all"],
    queryFn: async () => await trending_allApi(),
  });
  const trending_movie = useQuery({
    queryKey: ["trending_movie"],
    queryFn: async () => await trending_movieApi(),
  });
  const trending_tv = useQuery({
    queryKey: ["trending_tv"],
    queryFn: async () => await trending_tvApi(),
  });
  const trending_movie_top_rated = useQuery({
    queryKey: ["trending_movie_top_rated"],
    queryFn: async () => await trending_movie_top_ratedApi(),
  });
  const trending_tv_top_rated = useQuery({
    queryKey: ["trending_tv_top_rated"],
    queryFn: async () => await trending_tv_top_ratedApi(),
  });

  if (
    trending_all.isLoading ||
    trending_movie.isLoading ||
    trending_tv.isLoading ||
    trending_movie_top_rated.isLoading ||
    trending_tv_top_rated.isLoading ||
    trending_person.isLoading
  )
    return <Loader />;
  return (
    <div>
      <HomeBannerSlide data={trending_all.data?.results} />
      <div className="wrapper my-10 space-y-8">
        <SlideCard
          title="Trending person"
          data={trending_person.data?.results}
          media_type="person"
        />
        <SlideCard title="Trending movie" data={trending_movie.data?.results} />
        <SlideCard title="Trending tv" data={trending_tv.data?.results} />
        <SlideCard
          title="movie top rated"
          data={trending_movie_top_rated.data?.results}
          media_type="movie"
        />
        <SlideCard
          title="tv top rated"
          data={trending_tv_top_rated.data?.results}
          media_type="tv"
        />
      </div>
    </div>
  );
};

export default Home;
