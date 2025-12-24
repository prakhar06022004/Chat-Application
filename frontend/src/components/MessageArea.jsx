import { FaArrowLeftLong } from "react-icons/fa6";
import emptyImage from "../assets/emptyImage.png";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedUser } from "../redux/userSlice";
import { BsEmojiGrin } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { FaRegImages } from "react-icons/fa";
import { useContext, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import Sender from "./Sender";
import Receiver from "./Receiver";
import { UserContext } from "../context/ContextApi";
import axios from "axios";

function MessageArea() {
  const { serverUrl } = useContext(UserContext);
  const { selectedUser } = useSelector((state) => state.user);
  const dispatchRedux = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState("");
  const image = useRef();
  const onEmojiClick = (emoji) => {
    setInput((prevInput) => prevInput + emoji.emoji);
  };
  const [frontendImage, setFrontendImage] = useState("");
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    setFrontendImage(URL.createObjectURL(file));
    setbackendImage(file);
  };
  const [backendImage, setbackendImage] = useState("");

  const handleSendMessages = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (backendImage) {
      formData.append("image", backendImage);
    }
    formData.append("message", input);
    try {
      const { data } = await axios.post(
        `${serverUrl}/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );
      console.log(data);
      setInput("");
      setFrontendImage(null);
      setbackendImage(null);
    } catch (error) {
      console.log(error.message);
    }
  };
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

      {selectedUser && (
        <div className="w-full h-[calc(100vh-140px)] overflow-y-auto bg-amber-50 p-2 relative thin-scrollbar">
          {showPicker && (
            <div className="absolute bottom-0">
              <EmojiPicker
                width={300}
                height={300}
                onEmojiClick={onEmojiClick}
              />
            </div>
          )}
          {/* <Sender />
          <Sender />
          <Sender />
          <Receiver /> */}
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
        <div className="fixed bottom-1 md:right-2 sm:right-0 md:w-[61%] w-full mx-auto h-[60px] shadow-[0_0_15px] shadow-gray-300 rounded-2xl px-6 z-999">
          <form
            className="flex items-center w-full h-[60px] gap-4 relative"
            onSubmit={handleSendMessages}
          >
            <input
              type="file"
              hidden
              ref={image}
              accept="image/*"
              onChange={handleImagePreview}
            />
            <div onClick={() => setShowPicker((prev) => !prev)}>
              <BsEmojiGrin
                size={22}
                color="#898989"
                className="cursor-pointer"
              />
            </div>
            {frontendImage && (
              <img
                src={frontendImage}
                className="object-cover w-[100px] h-[100px] absolute bottom-16 rounded-2xl"
              />
            )}
            <div className="w-full select-none">
              <input
                type="text"
                className="w-full h-[30px] caret-black outline-none text-black placeholder:text-gray-400"
                placeholder="Message"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
            </div>
            <div onClick={() => image.current.click()}>
              <FaRegImages
                size={20}
                color="#898989"
                className="cursor-pointer"
              />
            </div>
            <button>
              <IoMdSend size={25} className="cursor-pointer" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default MessageArea;
