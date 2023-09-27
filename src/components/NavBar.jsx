import Logo from "@assets/images/idea icon.svg";
import UserProfile from "@components/UserProfile";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@app/features/authSlice";
import notify from "@utils/notify";
const NavBar = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  function goToDashboard() {
    if (!user) {
      notify("please login to create podcast", "🔒");
      return;
    }
    navigate("/dashboard");
  }
  return (
    <div className="bg-primary grid text-primaryLight font-primary h-20 grid-cols-[225px_auto_225px] max-[740px]:grid-cols-[auto_220px] grid-rows-[auto]">
      <div className="flex justify-center items-center gap-1 col-start-2 col-end-3 max-[740px]:col-start-1 max-[740px]:col-end-2 max-[671px]:ml-2 max-[671px]:mr-auto">
        <img
          onClick={() => navigate("/")}
          src={Logo}
          alt="logo"
          className="h-[40px]"
        />
        <span className="font-bold text-4xl tracking-widest max-[584px]:hidden whitespace-nowrap">
          Knowledge hub
        </span>
      </div>
      <div className="col-start-3 col-end-4 flex items-center pr-[5px] gap-8 max-[584px]:gap-4  max-[740px]:col-start-2 max-[740px]:col-end-3">
        <button
          onClick={goToDashboard}
          className=" rounded-md text-xl bg-[#ffffff65] cursor-pointer self-center px-4 py-2 tracking-wider whitespace-nowrap"
        >
          create podcast
        </button>
        <UserProfile />
      </div>
    </div>
  );
};

export default NavBar;
