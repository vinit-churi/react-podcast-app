import { useSelector } from "react-redux";
import { selectUser } from "@app/features/authSlice";
import { useGetUserPodcastsQuery } from "../app/features/podcastApi";
import PodcastCardSk from "@components/skeleton/PodcastCardSk";
import PodcastCard from "@components/PodcastCard";
const UserPodcasts = () => {
  const user = useSelector(selectUser);

  console.log(user);
  const {
    data: podcasts,
    isLoading,
    error,
  } = useGetUserPodcastsQuery(user?.uid);
  console.log(podcasts, isLoading, error);
  return (
    <div>
      <h1 className="font-primary text-center text-5xl mt-12">My Podcasts</h1>
      <p className="font-primary text-center text-base text-slate-400">
        Available on your favorite app.
      </p>
      <div className="flex justify-between gap-4 px-4 flex-wrap mt-6">
        {!podcasts && isLoading ? (
          Array.from({ length: 10 }, (_, i) => <PodcastCardSk key={i} />)
        ) : (
          <>
            {podcasts.map((podcast) => (
              <PodcastCard key={podcast.id} data={podcast} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UserPodcasts;
