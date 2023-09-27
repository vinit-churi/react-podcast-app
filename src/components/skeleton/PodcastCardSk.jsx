const PodcastCardSk = () => {
  return (
    <div className="mx-auto font-primary cursor-pointer bg-[#006845] flex gap-6 p-4 rounded-lg w-[min(90%,600px)] border-r-3 border-b-3  border-b-4 border-l-2 border-t-2 border-r-4 border-black m-2 max-[500px]:flex-col">
      <div className="h-56 bg-secondary  animate-pulse rounded-lg object-cover flex-[1_1_40%] max-[500px]:w-full  max-[500px]:flex-[0_0_250px]  max-[380px]:flex-[0_0_200px]"></div>
      <div className="flex-[1_1_60%]  max-[500px]:flex-[0_0_max-content]">
        <h1 className="text-3xl bg-secondary animate-pulse rounded-lg text-white tracking-wid max-h-[72px] h-[72px]   overflow-clip"></h1>
        <p className="text-white/75 tracking-wider bg-secondary mt-2 animate-pulse rounded-lg max-h-[48px] h-[48px]  overflow-clip"></p>
        <div className="w-full h-[5rem] mt-2 bg-secondary rounded-lg  animate-pulse block m-0 p-0 mx-auto max-[380px]:hidden"></div>
      </div>
    </div>
  );
};

export default PodcastCardSk;
