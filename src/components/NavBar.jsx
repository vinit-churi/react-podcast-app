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
    <div className="bg-primary text-primaryLight flex font-primary h-20">
      <div className="flex items-center gap-2 flex-[1_1_auto]">
        <img
          onClick={() => navigate("/")}
          src={Logo}
          alt="logo"
          className="h-[40px] max-[584px]:ml-2 ml-auto"
        />
        <span className="font-bold text-4xl tracking-widest mr-[20%] min-[1440px]:mr-auto max-[671px]:mr-auto max-[671px]:ml-2 max-[584px]:hidden ">
          Knowledge hub
        </span>
      </div>
      <div className="flex-[0_0_max-content] flex items-center gap-8 mr-10 max-[584px]:mr-4 max-[584px]:gap-4 ">
        <button
          onClick={goToDashboard}
          className=" rounded-md text-xl bg-[#ffffff65] cursor-pointer self-center px-4 py-2 tracking-wider"
        >
          create podcast
        </button>
        <UserProfile />
      </div>
    </div>
  );
};

export default NavBar;
