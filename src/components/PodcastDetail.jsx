import { useParams } from "react-router-dom";
import { useGetPodcastQuery } from "../app/features/podcastApi";
const PodcastDetail = () => {
  const { podcastId } = useParams();
  const { data, isLoading } = useGetPodcastQuery(podcastId);
  console.log(data, isLoading);
  return (
    <div className="min-h-screen grid grid-cols-[350px_auto]">
      <div className="bg-secondary">
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
      </div>
      <div>
        <h2 className="font-primary text-4xl text-center my-4">
          Available Episodes
        </h2>
      </div>
    </div>
  );
};

export default PodcastDetail;
