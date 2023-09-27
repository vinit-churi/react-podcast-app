import { AiOutlineLoading3Quarters } from "react-icons/ai";
const LoadingModal = () => {
  return (
    <div className="fixed h-screen w-screen inset-0 bg-black/50 flex justify-center items-center">
      <div className="h-36 w-40 flex justify-center items-center flex-col gap-2 rounded-md m-auto bg-white">
        <AiOutlineLoading3Quarters className="animate-spin text-5xl text-slate-900" />
        <h2 className="text-base font-primary text-secondary animate-pulse">
          few more seconds
        </h2>
      </div>
    </div>
  );
};

export default LoadingModal;
