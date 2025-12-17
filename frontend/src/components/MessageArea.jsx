import { FaArrowLeftLong } from "react-icons/fa6";
import emptyImage from "../assets/emptyImage.png";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedUser } from "../redux/userSlice";
function MessageArea() {
  const { selectedUser } = useSelector((state) => state.user);
  const dispatchRedux = useDispatch();
  return (
    <div
      className={`md:w-40% w-full h-full sm:px-5 px-5  ${
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
    </div>
  );
}

export default MessageArea;
