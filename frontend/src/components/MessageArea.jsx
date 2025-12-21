import { FaArrowLeftLong } from "react-icons/fa6";
import emptyImage from "../assets/emptyImage.png";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedUser } from "../redux/userSlice";
import { BsEmojiGrin } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { FaRegImages } from "react-icons/fa";


function MessageArea() {
  const { selectedUser } = useSelector((state) => state.user);
  const dispatchRedux = useDispatch();
  return (
    <div
      className={`md:w-40% w-full h-screen relative ${
        selectedUser ? "block" : "hidden md:flex"
      }
`}
    >
      {selectedUser && (
        <div className="bg-[#20c7ff] w-full h-[60px] sm:h-[60px] md:h-[60px] rounded-full flex items-center border-r-black-500 shadow-md mt-2 gap-4 ">
          {" "}
          <div className="cursor-pointer ml-6">
            <FaArrowLeftLong
              color="white"
              size={20}
              onClick={() => dispatchRedux(clearSelectedUser())}
            />
          </div>
          <div className="sm:w-[45px] sm:h-[45px] w-[35px] h-[35px] rounded-full overflow-visible relative">
            <img
              src={selectedUser?.image || emptyImage}
              alt="profile"
              className="w-full h-full object-cover rounded-full shadow-gray-500 shadow-md"
              title="profile"
            />
          </div>
          <h1 className=" font-semibold text-[18px] text-white">
            {selectedUser?.name}
          </h1>
        </div>
      )}
      {!selectedUser && (
        <div className="h-full w-full flex items-center justify-center">
          <h1 className="text-[18px] font-margarine text-gray-600">
            Welcome to Pakhii || Chatting
          </h1>
        </div>
      )}

      {selectedUser && (
        <div className="fixed bottom-1 md:right-2 sm:right-0 md:w-[61%] w-full mx-auto h-[60px] shadow-[0_0_15px] shadow-gray-300 rounded-2xl px-6">
          <form className="flex items-center w-full h-[60px] gap-4">
            <div>
              <BsEmojiGrin
                size={22}
                color="#898989"
                className="cursor-pointer"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                className="w-full h-[30px] caret-black outline-none text-black placeholder:text-gray-400"
                placeholder="Message"
              />
            </div>
            <div><FaRegImages size={20} color="#898989"/>
</div>
            <div>
              <IoMdSend size={25} className="cursor-pointer" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default MessageArea;
