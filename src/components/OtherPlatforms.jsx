import compnay1Logo from "../assets/images/business-insider.svg";
import compnay2Logo from "../assets/images/lifehacker.svg";
import compnay3Logo from "../assets/images/mkbhd.svg";
import compnay4Logo from "../assets/images/nyt.svg";
import compnay5Logo from "../assets/images/business-insider.svg";
const OtherPlatforms = () => {
  return (
    <div className="h-72 bg-secondary flex items-center flex-col gap-12 justify-center">
      <p className="text-xl text-center tracking-wide text-greenTint/75 font-primary">
        Listen on the best podcast platform, trusted by many.
      </p>
      <div className="w-[90%] grid grid-cols-[repeat(5,1fr)] gap-4 custom-mask overflow-hidden">
        <img
          src={compnay1Logo}
          className="w-[100px] min-w-[100px] block mx-auto"
          alt=""
        />
        <img
          src={compnay2Logo}
          className="w-[100px] min-w-[100px] block mx-auto"
          alt=""
        />
        <img
          src={compnay3Logo}
          className="w-[100px] min-w-[100px] block mx-auto"
          alt=""
        />
        <img
          src={compnay4Logo}
          className="w-[100px] min-w-[100px] block mx-auto"
          alt=""
        />
        <img
          src={compnay5Logo}
          className="w-[100px] min-w-[100px] block mx-auto"
          alt=""
        />
      </div>
    </div>
  );
};

export default OtherPlatforms;
