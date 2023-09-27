import { useSelector } from "react-redux";
import { selectUser } from "@app/features/authSlice";
import { useGetUserPodcastsQuery } from "../app/features/podcastApi";
const UserPodcasts = () => {
  const user = useSelector(selectUser);
  console.log(user);
  const {
    data: podcasts,
    isLoading,
    error,
  } = useGetUserPodcastsQuery(user?.uid);
  console.log(podcasts, isLoading, error);
  return <div>UserPodcasts</div>;
};

export default UserPodcasts;
