import { useSelector } from "react-redux";
import emptyImage from "../assets/emptyImage.png";
import { GoDotFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";

function Sidebar() {
  const [search,setSearch] = useState(false)
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="lg:w-[30%] w-full h-full bg-slate-200 border-r border-gray-300 p-1">
      <div className="bg-[#20c7ff] w-full sm:h-[110px] h-[120px] rounded-full flex flex-col items-center text-center border-r-black-500 shadow-md mt-2">
        <h1 className="text-2xl text-white font-lobster mt-2 font-semibold shadow-sm shadow-blue p-1 px-2 rounded-2xl">
          Pakhiii | Chatting
        </h1>
        <div className="w-full flex justify-between items-center px-5">
          <h1 className="font-lobster -tracking-normal text-white font-bold text-[20px]">
            Hi,
            <span className="text-white font-normal text-[16px]">
              {userData?.name}
            </span>
          </h1>
          <div className="w-[50px] h-[50px] rounded-full overflow-visible relative">
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
    </div>
  );
}

export default Sidebar;
