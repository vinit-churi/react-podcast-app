import Logo from "../assets/images/idea icon.svg";
const NavBar = () => {
  return (
    <div className="bg-primary text-primaryLight flex font-primary h-20">
      <div className="flex items-center gap-2 flex-[1_1_auto]">
        <img src={Logo} alt="logo" className="h-[40px] ml-auto" />
        <span className="font-bold text-4xl tracking-widest mr-[30%]">
          Knowledge hub
        </span>
      </div>
      <div className="flex-[0_0_max-content] flex items-center gap-8 mr-10 ">
        <button className="tracking-wider text-xl cursor-pointer">Login</button>
        <button className="rounded-md text-xl bg-[#ffffff65] cursor-pointer self-center px-4 py-2 tracking-wider">
          create podcast
        </button>
      </div>
    </div>
  );
};

export default NavBar;
