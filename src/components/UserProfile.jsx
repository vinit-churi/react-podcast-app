import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  login,
  logout,
  authStateChange,
} from "@app/features/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const user = useSelector(selectUser);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // detect click outside of the element
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    const unsubscribe = authStateChange(dispatch);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      unsubscribe.then((unsubscribe) => {
        unsubscribe();
      });
    };
  }, []);
  return (
    <div ref={containerRef} className="flex items-center">
      {user ? (
        <div
          aria-label="user profile dropdown"
          className="relative cursor-pointer"
        >
          <img
            src={user.photoURL}
            alt="user profile"
            className="h-10 w-10 rounded-full"
            onClick={() => setShowDropdown((prev) => !prev)}
          />
          {showDropdown && (
            <div className="absolute top-12 right-0 bg-slate-100 border border-slate-700 rounded-lg w-40 z-[120]">
              <ul className="text-slate-900">
                <li
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/user/podcasts");
                  }}
                  className="p-2 border-b border-slate-300 hover:bg-white hover:text-black cursor-pointer"
                >
                  created podcasts
                </li>
                <li
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/user/subscriptions");
                  }}
                  className="p-2 border-b border-slate-300 hover:bg-white hover:text-black cursor-pointer"
                >
                  Subscribed
                </li>
                <li
                  className="p-2 border-b border-slate-300 hover:bg-white hover:text-black cursor-pointer rounded-br-lg rounded-bl-lg"
                  onClick={() => {
                    setShowDropdown(false);
                    logout(dispatch);
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => login(dispatch)}
          className="tracking-wider text-xl cursor-pointer"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default UserProfile;
