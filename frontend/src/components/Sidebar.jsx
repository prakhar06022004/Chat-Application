import { useDispatch, useSelector } from "react-redux";
import emptyImage from "../assets/emptyImage.png";
import { GoDotFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { SlLogout } from "react-icons/sl";
import { logout, setSelectedUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useMemo } from "react";
import axios from "axios";
import { UserContext } from "../context/ContextApi";

function Sidebar() {
  const { serverUrl } = useContext(UserContext);
  const dispatchRedux = useDispatch();
  const navigate = useNavigate();

const { userData, otherUserData, selectedUser } = useSelector(
    (state) => state.user
  );

  // Search state
  const [search, setSearch] = useState("");

    const users = Array.isArray(otherUserData) ? otherUserData : [];

  // 🔍 Simple filter
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverUrl}/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatchRedux(logout());
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`md:w-[60%] w-full h-screen bg-slate-200 border-r border-gray-300 p-1 relative ${
        selectedUser ? "hidden md:block" : "block"
      }`}
    >
      {/* Title */}
      <h1 className="text-2xl text-white font-semibold bg-[#20c7ff] w-fit m-auto px-3 py-1 rounded-2xl mt-2">
        Pakhiii | Chatting
      </h1>

      {/* Header */}
      <div className="bg-[#20c7ff] h-[60px] rounded-full flex items-center justify-between px-5 mt-2">
        <h1 className="text-white text-[18px]">
          Hi, {userData?.name || "User"}
        </h1>

        <div
          className="w-[45px] h-[45px] rounded-full relative cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <img
            src={userData?.image || emptyImage}
            className="w-full h-full object-cover rounded-full"
          />
          <span className="absolute -bottom-1 right-0">
            <GoDotFill color="#51f542" />
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="mt-3 bg-white rounded-2xl flex p-1">
        <input
          type="search"
          className="w-full px-2 outline-none"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IoIosSearch size={30} />
      </div>

      {/* Users */}
      <div className="mt-3 flex flex-col gap-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-2xl flex items-center gap-3 p-2 shadow cursor-pointer hover:bg-gray-100"
              onClick={() => dispatchRedux(setSelectedUser(user))}
            >
              <img
                src={user.image || emptyImage}
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <h1 className="font-semibold">{user.name}</h1>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-5">
            No users found
          </p>
        )}
      </div>

      {/* Logout */}
      <button
        className="bg-[#20c7ff] p-4 rounded-full absolute bottom-2 right-2"
        onClick={handleLogout}
      >
        <SlLogout />
      </button>
    </div>
  );
}

export default Sidebar;
