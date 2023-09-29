import {
  useGetUserSubscriptionsQuery,
  useGetMultiplePodcastsQuery,
} from "@app/features/podcastApi";
import { useSelector } from "react-redux";
import { selectUser } from "@app/features/authSlice";
import PodcastCardSk from "@components/skeleton/PodcastCardSk";
import PodcastCard from "@components/PodcastCard";
const UserSubscriptions = () => {
  const user = useSelector(selectUser);
  const { data: subscriptions, isLoading: subscriptionQueryLoading } =
    useGetUserSubscriptionsQuery(user?.uid);
  // console.log(subscriptions);
  const { data: podcasts, isLoading: podcastQueryLoading } =
    useGetMultiplePodcastsQuery(subscriptions, {
      skip: subscriptionQueryLoading || !subscriptions,
    });
  console.log(podcasts, podcastQueryLoading, "loading correctly");
  return (
    <div className="min-h-[calc(100vh-100px)]">
      <h2 className="font-primary text-4xl text-center my-4">
        Your Subscriptions
      </h2>
      <div className="flex justify-between gap-4 px-4 flex-wrap mt-6">
        {!podcasts && podcastQueryLoading ? (
          Array.from({ length: 10 }, (_, i) => <PodcastCardSk key={i} />)
        ) : (
          <>
            {podcasts &&
              podcasts.map((podcast) => (
                <PodcastCard key={podcast.id} data={podcast} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UserSubscriptions;
