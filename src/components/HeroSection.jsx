import { useNavigate } from "react-router-dom";
import womanImage from "../assets/images/headphone-woman.png";
import micImage from "../assets/images/big-mic.png";
import profileOneImg from "../assets/images/profile1.jpeg";
import profileTwoImg from "../assets/images/profile2.jpeg";
import profileThreeImg from "../assets/images/profile3.jpeg";
import profileFourImg from "../assets/images/profile4.jpeg";
import profileFiveImg from "../assets/images/profile5.jpeg";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-primary h-[600px] flex">
      <div className="flex-[0_0_300px] self-end max-[1108px]:flex-[0_0_0px] ">
        <img src={womanImage} className="" alt="" />
      </div>
      <div className="flex-[1_1_auto] self-end px-8">
        <h1 className="text-center font-primary text-5xl text-greenTint tracking-wider">
          Talking best and trending topics
        </h1>
        <p className="text-center font-primary my-4 text-xl text-greenTint tracking-wide leading-5 px-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
          a quo quaerat facilis aspernatur necessitatibus harum ab
          reprehenderit.
        </p>
        <button
          onClick={() => navigate("/podcasts")}
          className="font-primary max-[452px]:mb-32 bg-secondaryVariant px-4 py-2 rounded-md outline-none border-none text-purpleTint mx-auto my-8 block text-xl ease-in-out duration-300 hover:scale-105"
        >
          Browse Podcast
        </button>
        <div className="mt-32 mb-4 flex justify-center content-center max-[452px]:hidden">
          <div className="grid w-min gap-3 grid-cols-[repeat(7,20px)]">
            <img
              src={profileOneImg}
              className="w-[40px] border-2 border-white border-solid h-[40px] object-cover rounded-full col-span-2 col-start-1 row-start-1 row-end-1"
              alt=""
            />
            <img
              src={profileTwoImg}
              className="w-[40px] h-[40px] border-2 border-white border-solid object-cover rounded-full col-span-2 col-start-2 row-start-1 row-end-1"
              alt=""
            />
            <img
              src={profileThreeImg}
              className="w-[40px] h-[40px] border-2 border-white border-solid object-cover rounded-full col-span-2 col-start-3 row-start-1 row-end-1"
              alt=""
            />
            <img
              src={profileFourImg}
              className="w-[40px] h-[40px] border-2 border-white border-solid object-cover rounded-full col-span-2 col-start-4 row-start-1 row-end-1"
              alt=""
            />
            <img
              src={profileFiveImg}
              className="w-[40px] h-[40px] border-2 border-white border-solid object-cover rounded-full col-span-2 col-start-5 row-start-1 row-end-1"
              alt=""
            />
            <p className="m-0 h-[40px] border-2 border-white border-solid w-[40px] flex items-center justify-center text-greenTint text-xs font-primary bg-secondary rounded-full col-start-6 row-start-1 row-end-1">
              300+
            </p>
          </div>
          <p className="flex items-center text-greenTint font-primary text-lg tracking-wide">
            more people are listening on Knowledge hub.
          </p>
        </div>
      </div>
      <div className="flex-[0_0_300px] max-[1108px]:flex-[0_0_0px] self-center">
        <img
          src={micImage}
          className="h-auto w-[230px] origin-right scale-125 block mr-0 ml-auto"
          alt=""
        />
      </div>
    </div>
  );
};

export default HeroSection;
