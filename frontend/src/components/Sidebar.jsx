import { useDispatch, useSelector } from "react-redux";
import emptyImage from "../assets/emptyImage.png";
import { GoDotFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { SlLogout } from "react-icons/sl";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/ContextApi";

function Sidebar() {
  const { serverUrl, othersLoading } = useContext(UserContext);

  const dispatchRedux = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        serverUrl + "/auth/logout",
        {},
        { withCredentials: true }
      );

      dispatchRedux(logout());
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const { userData, otherUserData } = useSelector((state) => state.user);
  return (
    <div className="lg:w-[30%] w-full h-full bg-slate-200 border-r border-gray-300 p-1 relative select-none">
      <div className="bg-[#20c7ff] w-full sm:h-[110px] h-[120px] rounded-full flex flex-col items-center text-center border-r-black-500 shadow-md mt-2">
        <h1 className="text-2xl text-white font-lobster mt-2 font-semibold shadow-sm shadow-blue p-1 px-2 rounded-2xl">
          Pakhiii | Chatting
        </h1>
        <div className="w-full flex justify-between items-center px-5 mt-2">
          <h1 className="font-lobster -tracking-normal text-white font-bold text-[20px]">
            Hi,{" "}
            <span className="text-white font-normal text-[18px]">
              {userData?.name}
            </span>
          </h1>
          <div className="w-[45px] h-[45px] rounded-full overflow-visible relative">
            <img
              src={userData?.image || emptyImage}
              alt="profile"
              className="w-full h-full object-cover rounded-full shadow-gray-500 shadow-md"
            />
            <span className="absolute -bottom-0.5 right-0">
              <GoDotFill color="#51f542" />
            </span>
          </div>
        </div>
      </div>
      <div className="border mt-3 w-full rounded-2xl border-white bg-white flex p-1">
        <input
          type="search"
          className="w-full px-2 py-1 outline-none"
          placeholder="Search users . . ."
        />
        <IoIosSearch size={30} />
      </div>
      {otherUserData?.map((user) => (
        <div
          key={user._id}
          className="w-[50px] h-[50px] rounded-full overflow-visible mt-4 relative outline-gray-500/50 outline-3"
        >
          <img
            src={user.image || emptyImage}
            className="w-full h-full object-cover rounded-full relative"
          />
          <span className="absolute -bottom-1 -right-0.5">
            <GoDotFill color="#929693" />
          </span>
        </div>
      ))}
      <button
        className="bg-[#20c7ff] w-fit p-5 rounded-full absolute bottom-0 cursor-pointer"
        onClick={handleLogout}
      >
        <SlLogout />
      </button>
    </div>
  );
}

export default Sidebar;
