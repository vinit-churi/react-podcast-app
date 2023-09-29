import { useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  useGetPodcastQuery,
  useGetUserSubscriptionsQuery,
  useRemovePodcastFromSubscriptionMutation,
  useAddToSubscriptionMutation,
} from "@app/features/podcastApi";
import { useSelector } from "react-redux";
import { selectUser } from "@app/features/authSlice";
import { MdAddBox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EpisodeCard from "@components/EpisodeCard";
import notify from "@utils/notify";
const PodcastDetail = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { podcastId } = useParams();
  const { data, isLoading } = useGetPodcastQuery(podcastId);
  const {
    data: subscriptions,
    isLoading: subscriptionQueryLoading,
    refetch,
  } = useGetUserSubscriptionsQuery(user?.uid);
  const [removePodcastFromSubscription] =
    useRemovePodcastFromSubscriptionMutation();
  const [addToSubscription] = useAddToSubscriptionMutation();
  async function handleAddToSubscription() {
    if (!user) {
      return notify("Please login to subscribe", "❗");
    }
    try {
      await addToSubscription({ userId: user.uid, podcastId: podcastId });
      refetch();
    } catch (error) {
      console.log(error);
    }
  }
  async function handleRemoveFromSubscription() {
    try {
      await removePodcastFromSubscription({
        userId: user.uid,
        podcastId: podcastId,
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen grid grid-cols-[350px_auto] max-[930px]:grid-cols-[300px_auto] max-[800px]:grid-cols-[100%] ">
      <div className="bg-secondary">
        {user && user.uid === data?.podcast.createdBy && (
          <button
            onClick={() => navigate("add-episode")}
            className="bg-green-600/60 flex items-center justify-center gap-2 font-primary text-2xl w-2/3 mt-4 mx-auto  hover:scale-110 ease-in-out duration-300 text-white px-4 py-4 rounded-lg"
          >
            <MdAddBox />
            <p>Add Episode</p>
          </button>
        )}
        <div
          className={`mx-auto mt-20 max-[800px]:mt-4 w-[80%] h-[250px] ${
            !data && "animate-pulse"
          } rounded-xl bg-primary`}
        >
          {data && (
            <img
              src={data.podcast.image}
              alt=""
              className="rounded-xl h-full w-full object-cover"
            />
          )}
        </div>
        <h2
          className={`${
            !data && "animate-pulse bg-primary"
          }   min-h-[3rem] min-w-[60%] max-w-[90%] rounded-lg mx-auto mt-4 flex justify-center items-center font-primary text-2xl text-greenTint`}
        >
          {data && data.podcast.name}
        </h2>
        <p
          className={`${
            !data && "animate-pulse bg-primary"
          }   min-h-[3rem] min-w-[60%] max-w-[90%] mt-0 rounded-lg mx-auto mt-4 text-center font-primary text-lg text-greenTint`}
        >
          {data && data.podcast.description}
        </p>
        <div className="flex justify-center items-center gap-4 mt-4">
          {subscriptionQueryLoading && user ? (
            <button className="bg-primary hover:scale-110 ease-in-out duration-300 text-white px-4 py-2 rounded-lg max-[800px]:mb-6">
              <AiOutlineLoading3Quarters className="animate-spin" />
            </button>
          ) : subscriptions && user && subscriptions.includes(podcastId) ? (
            <button
              onClick={handleRemoveFromSubscription}
              className="bg-primary hover:scale-110 ease-in-out duration-300 text-white px-4 py-2 rounded-lg  max-[800px]:mb-6"
            >
              Unsubscribe
            </button>
          ) : (
            <button
              onClick={handleAddToSubscription}
              className="bg-primary hover:scale-110 ease-in-out duration-300 text-white px-4 py-2 rounded-lg max-[800px]:mb-6"
            >
              Subscribe
            </button>
          )}
        </div>
      </div>
      <div>
        <h2 className="font-primary text-4xl text-center my-4">
          Available Episodes
        </h2>
        <div className="mx-5 min-h-[calc(100vh-200px)]">
          {data ? (
            data.episodes.map((episode, index) => (
              <EpisodeCard
                data={episode}
                key={episode.id}
                index={index < 10 ? `0${index + 1}` : `${index + 1}`}
              />
            ))
          ) : (
            <p>loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodcastDetail;
