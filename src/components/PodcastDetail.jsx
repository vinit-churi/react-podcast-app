import { useParams } from "react-router-dom";
import { useGetPodcastQuery } from "@app/features/podcastApi";
import { useSelector } from "react-redux";
import { selectUser } from "@app/features/authSlice";
import { MdAddBox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EpisodeCard from "@components/EpisodeCard";
const PodcastDetail = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { podcastId } = useParams();
  const { data, isLoading } = useGetPodcastQuery(podcastId);
  console.log(data, isLoading);
  if (user) {
    console.log(
      user.uid === data?.podcast.createdBy,
      user.uid,
      data?.podcast.createdBy
    );
  }
  return (
    <div className="min-h-screen grid grid-cols-[350px_auto]">
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
          className={`mx-auto mt-20 w-[80%] h-[250px] ${
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
          <button className="bg-primary hover:scale-110 ease-in-out duration-300 text-white px-4 py-2 rounded-lg">
            Subscribe
          </button>
          {/* <button className="bg-primary hover:scale-110 ease-in-out duration-300 text-white px-4 py-2 rounded-lg">
            Unsubscribe
          </button> */}
        </div>
      </div>
      <div>
        <h2 className="font-primary text-4xl text-center my-4">
          Available Episodes
        </h2>
        <div className="mx-5">
          {data ? (
            data.episodes.map((episode, index) => (
              <EpisodeCard
                data={episode}
                key={episode.id}
                index={index < 10 ? `0${index}` : `${index}`}
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
