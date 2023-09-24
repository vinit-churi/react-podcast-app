import LogoImage from "../assets/images/idea icon.svg";
const Footer = () => {
  return (
    <div>
      <div className="bg-primary flex flex-col items-center justify-center gap-4 py-10">
        <img src={LogoImage} alt="logo" className="h-[40px]" />
        <span className="font-bold text-4xl tracking-widest text-greenTint">
          Knowledge hub
        </span>
        <span className="text-greenTint text-sm">
          © 2021 Knowledge hub. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
