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
import { setMessages, addMessage } from "../redux/messageSlice";

function MessageArea() {
  const [isTyping, setIsTyping] = useState(false);
const [typingUser, setTypingUser] = useState(false);

  const { serverUrl } = useContext(UserContext);
  const { selectedUser, userData, socket } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);

  const dispatchRedux = useDispatch();
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState("");
  const [frontendImage, setFrontendImage] = useState("");
  const [backendImage, setbackendImage] = useState("");

  const image = useRef();

  // FETCH MESSAGES WHEN CHAT CHANGES
  useEffect(() => {
    if (!selectedUser) return;
    dispatchRedux(setMessages([]));

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

  // EMOJI PICKER
  const onEmojiClick = (emoji) => {
    setInput((prevInput) => prevInput + emoji.emoji);
  };

  // IMAGE PREVIEW
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    setFrontendImage(URL.createObjectURL(file));
    setbackendImage(file);
  };

  // SEND MESSAGE
  const handleSendMessages = async (e) => {
    e.preventDefault();
    if (!input.trim() && !backendImage) {
      return; // kuch bhi bhejna hi nahi
    }
    const formData = new FormData();
    if (backendImage) formData.append("image", backendImage);
    formData.append("message", input);

    try {
      const { data } = await axios.post(
        `${serverUrl}/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );
socket.emit("stopTyping", selectedUser._id);
setIsTyping(false);
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

  //BACK BUTTON (ONLY CLOSE CHAT – DON’T DELETE MESSAGES)

  const handleBack = () => {
    dispatchRedux(clearSelectedUser());
  };

  useEffect(() => {
  if (!socket) return;

  const handleNewMessage = (message) => {
    // sirf active chat ka message
    if (
      message.sender === selectedUser?._id ||
      message.receiver === selectedUser?._id
    ) {
      dispatchRedux(addMessage(message));
    }
  };

  socket.on("newMessage", handleNewMessage);

  return () => {
    socket.off("newMessage", handleNewMessage);
  };
}, [socket, selectedUser?._id, dispatchRedux]);

useEffect(() => {
  if (!socket) return;

  socket.on("typing", () => {
    setTypingUser(true);
  });

  socket.on("stopTyping", () => {
    setTypingUser(false);
  });

  return () => {
    socket.off("typing");
    socket.off("stopTyping");
  };
}, [socket]);

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
            <div className="absolute bottom-16">
              <EmojiPicker
                width={300}
                height={300}
                onEmojiClick={onEmojiClick}
              />
            </div>
          )}

{messages?.map((msg) =>
  msg?.sender === userData._id ? (
    <Sender key={msg._id} image={msg.image} message={msg.message} />
  ) : (
    <Receiver key={msg._id} image={msg.image} message={msg.message} />
  )
)}

{typingUser && (
  <div className="flex items-center gap-2 ml-4 mt-5">
    <span className="text-xs text-gray-400">Typing...</span>
  </div>
)}

          <div ref={scrollRef}></div>
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
  onChange={(e) => {
    setInput(e.target.value);

    if (!socket) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", selectedUser._id);
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && isTyping) {
        socket.emit("stopTyping", selectedUser._id);
        setIsTyping(false);
      }
    }, timerLength);
  }}
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
