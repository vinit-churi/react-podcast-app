import amplitudeImage from "@assets/images/audio-amp.png";
import { useNavigate } from "react-router-dom";
const PodcastCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/podcasts/${data.id}`)}
      className="mx-auto font-primary cursor-pointer bg-[#006845] flex gap-6 p-4 rounded-lg w-[min(90%,600px)] border-r-3 border-b-3 border-b-4 border-l-2 border-t-2 border-r-4 border-black m-2 max-[500px]:flex-col"
    >
      <img
        src={data.image}
        alt="some"
        className="h-56 w-[40%] rounded-lg object-cover flex-[0_1_40%] max-[500px]:w-full  max-[500px]:flex-[0_0_250px] max-[380px]:flex-[0_0_200px]"
      />
      <div className="flex-[0_1_60%] max-[500px]:flex-[0_0_max-content]">
        <h1 className="text-3xl text-white tracking-wid max-h-[72px] h-[72px]   overflow-clip">
          {data.name}
        </h1>
        <p className="text-white/75 tracking-wider max-h-[48px] h-[48px]  overflow-clip">
          {data.tagLine}
        </p>
        <img
          src={amplitudeImage}
          alt=""
          className="w-auto h-[6rem] block m-0 p-0 mx-auto max-[380px]:hidden"
        />
      </div>
    </div>
  );
};

export default PodcastCard;
