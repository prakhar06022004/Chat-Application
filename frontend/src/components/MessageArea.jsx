import { FaArrowLeftLong } from "react-icons/fa6";
import emptyImage from "../assets/emptyImage.png";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedUser } from "../redux/userSlice";
import { BsEmojiGrin } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { FaRegImages } from "react-icons/fa";
import { useContext, useRef, useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import Sender from "./Sender";
import Receiver from "./Receiver";
import { UserContext } from "../context/ContextApi";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";

function MessageArea() {
  const { serverUrl } = useContext(UserContext);
  const { selectedUser, userData } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);

  const dispatchRedux = useDispatch();

  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState("");
  const [frontendImage, setFrontendImage] = useState("");
  const [backendImage, setbackendImage] = useState("");

  const image = useRef();

  // --------------------------------------------------
  // ✔ FETCH MESSAGES WHEN CHAT CHANGES
  // --------------------------------------------------
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `${serverUrl}/message/receive/${selectedUser._id}`,
          { withCredentials: true }
        );

        dispatchRedux(setMessages(data)); // SET new messages for this chat
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  // --------------------------------------------------
  // ✔ EMOJI PICKER
  // --------------------------------------------------
  const onEmojiClick = (emoji) => {
    setInput((prevInput) => prevInput + emoji.emoji);
  };

  // --------------------------------------------------
  // ✔ IMAGE PREVIEW
  // --------------------------------------------------
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    setFrontendImage(URL.createObjectURL(file));
    setbackendImage(file);
  };

  // --------------------------------------------------
  // ✔ SEND MESSAGE
  // --------------------------------------------------
  const handleSendMessages = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (backendImage) formData.append("image", backendImage);
    formData.append("message", input);

    try {
      const { data } = await axios.post(
        `${serverUrl}/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );

      // APPEND new message (NOT OVERWRITE)
      dispatchRedux(setMessages([...messages, data]));

      // RESET form
      setInput("");
      setFrontendImage("");
      setbackendImage("");
    } catch (error) {
      console.log(error.message);
    }
  };

  // --------------------------------------------------
  // ✔ BACK BUTTON (ONLY CLOSE CHAT – DON’T DELETE MESSAGES)
  // --------------------------------------------------
  const handleBack = () => {
    dispatchRedux(clearSelectedUser());
  };

  // --------------------------------------------------
  // ✔ UI
  // --------------------------------------------------
  return (
    <div
      className={`md:w-40% w-full h-screen relative ${
        selectedUser ? "block" : "hidden md:flex"
      }`}
    >
      {selectedUser && (
        <div className="bg-[#20c7ff] w-full h-[60px] rounded-full flex items-center shadow-md mt-2 gap-4">
          <div className="cursor-pointer ml-6">
            <FaArrowLeftLong color="white" size={20} onClick={handleBack} />
          </div>

          <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
            <img
              src={selectedUser?.image || emptyImage}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="font-semibold text-[18px] text-white">
            {selectedUser?.name}
          </h1>
        </div>
      )}

      {selectedUser && (
        <div className="w-full h-[calc(100vh-140px)] overflow-y-auto bg-amber-50 p-2 thin-scrollbar">
          {showPicker && (
            <div className="absolute bottom-0">
              <EmojiPicker width={300} height={300} onEmojiClick={onEmojiClick} />
            </div>
          )}

          {messages?.map((msg) =>
            msg?.sender === userData._id ? (
              <Sender key={msg._id} image={msg.image} message={msg.message} />
            ) : (
              <Receiver key={msg._id} image={msg.image} message={msg.message} />
            )
          )}
        </div>
      )}

      {!selectedUser && (
        <div className="h-full w-full flex items-center justify-center">
          <h1 className="text-[18px] text-gray-600">
            Welcome to Pakhii || Chatting
          </h1>
        </div>
      )}

      {selectedUser && (
        <div className="fixed bottom-1 md:right-2 md:w-[61%] w-full mx-auto h-[60px] shadow-[0_0_15px] shadow-gray-300 rounded-2xl px-6">
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

            <input
              type="text"
              className="w-full h-[30px] caret-black outline-none"
              placeholder="Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

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
