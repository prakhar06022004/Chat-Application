import { useDispatch, useSelector } from "react-redux";
import emptyImage from "../assets/emptyImage.png";
import { GoDotFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { SlLogout } from "react-icons/sl";
import { logout, setSelectedUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/ContextApi";

function Sidebar() {
  const { serverUrl } = useContext(UserContext);

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

  const { userData, otherUserData,selectedUser } = useSelector((state) => state.user);
  return (
    <div className={`md:w-[60%] w-full h-screen bg-slate-200 border-r border-gray-300 p-1 relative select-none  ${selectedUser ? "hidden md:block" : "block"}`}>
      <h1 className="text-2xl text-white font-lobster mt-2 font-semibold shadow-md shadow-gray-400 p-1 px-2 rounded-2xl bg-[#20c7ff] w-fit m-auto">
        Pakhiii | Chatting
      </h1>
      <div className="bg-[#20c7ff] w-full sm:h-[60px] h-[60px] rounded-full flex flex-col items-center justify-center text-center border-r-black-500 shadow-md mt-2">
        <div className="w-full flex justify-between items-center px-5">
          <h1 className="font-lobster -tracking-normal text-white font-bold text-[20px]">
            Hi,{" "}
            <span className="text-white font-normal text-[18px]">
              {userData?.name || "user"}
            </span>
          </h1>
          <div
            className="sm:w-[45px] sm:h-[45px] w-[35px] h-[35px] rounded-full overflow-visible relative cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <img
              src={userData?.image || emptyImage}
              alt="profile"
              className="w-full h-full object-cover rounded-full shadow-gray-500 shadow-md"
              title="profile"
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
      {/* Online users strip */}
      {/* <div className="w-full overflow-x-auto overflow-y-hidden mt-3 thin-scrollbar">
        <div className="flex gap-2 px-1 h-[60px] items-center">
          {otherUserData?.map((user) => (
            <div
              key={user._id}
              className="w-[50px] h-[50px] rounded-full shrink-0 relative"
            >
              <img
                src={user.image || emptyImage}
                className="w-full h-full object-cover rounded-full"
              />
              <span className="absolute -bottom-0.5 right-0">
                <GoDotFill color="#929693" />
              </span>
            </div>
          ))}
        </div>
      </div> */}
      <div className="w-full flex flex-col items-center gap-2 mt-3 cursor-pointer ">
        {otherUserData?.map((user) => (
          <div
            key={user._id}
            className="w-full h-[60px] flex items-stretch bg-white shadow-md shadow-gray-400 rounded-2xl gap-3 px-1 hover:bg-gray-100 duration-150"
            onClick={() => dispatchRedux(setSelectedUser(user))}
          >
            {/* Image wrapper */}
            <div className="w-[50px] h-full flex items-center shrink-0">
              <img
                src={user.image || emptyImage}
                className="w-[50px] h-[50px] object-cover rounded-full"
              />
            </div>

            {/* Text wrapper */}
            <div className="flex flex-col justify-start pt-1">
              <h1 className="text-sm font-semibold text-[16px]">
                {user?.name}
              </h1>
            </div>
          </div>
        ))}
      </div>

      <button
        className="bg-[#20c7ff] w-fit p-5 rounded-full absolute bottom-0 cursor-pointer"
        onClick={handleLogout}
        title="logout"
      >
        <SlLogout />
      </button>
    </div>
  );
}

export default Sidebar;
