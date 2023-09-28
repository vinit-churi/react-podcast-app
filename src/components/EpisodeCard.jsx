const EpisodeCard = ({ data, index }) => {
  return (
    <div className="flex @container flex-wrap font-primary mx-auto w-[min(90%,700px)] rounded-lg p-4 gap-4 border-r-3 border-b-3 border-b-4 border-l-2 border-t-2 border-r-4 border-black">
      <div className="flex-[0_1_100%] @[516px]:flex-[0_1_40%] gap-2 relative rounded-lg">
        <img
          src={data.image}
          alt=""
          className="w-full h-52 object-cover rounded-lg object-center block mx-auto"
        />
        <div className="absolute text-white text-2xl flex justify-center items-center top-0 left-0 bg-black/30  h-12 w-12 rounded-tl-lg backdrop-blur-sm rounded-br-lg aspect-square">
          {index}
        </div>
      </div>
      <div className="flex-[0_1_100%] grid grid-cols-[100%] grid-rows-[max-content_max-content_auto]">
        <h1 className="text-3xl my-2">{data.name}</h1>
        <p className="text-lg mb-2 text-slate-400">{data.description}</p>
        <audio
          src={data.audio}
          controls
          preload="auto"
          className="w-full mt-auto"
        ></audio>
      </div>
    </div>
  );
};

export default EpisodeCard;
