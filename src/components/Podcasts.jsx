import { useGetAllPodcastsQuery } from "@app/features/podcastApi";
import PodcastCardSk from "@components/skeleton/PodcastCardSk";
import PodcastCard from "@components/PodcastCard";
const Podcasts = () => {
  const { data, error, isLoading } = useGetAllPodcastsQuery();
  console.log(data, error, isLoading);
  return (
    <div className="min-h-screen">
      <h1 className="font-primary text-center text-5xl mt-12">
        Most Popular Podcasts
      </h1>
      <p className="font-primary text-center text-base text-slate-400">
        Available on your favorite app.
      </p>
      <div className="flex justify-between gap-4 px-4 flex-wrap mt-6">
        {!data && isLoading ? (
          Array.from({ length: 10 }, (_, i) => <PodcastCardSk key={i} />)
        ) : (
          <>
            {data.map((podcast) => (
              <PodcastCard key={podcast.id} data={podcast} />
            ))}
          </>
        )}

        {/* loading  */}
      </div>
    </div>
  );
};

export default Podcasts;
