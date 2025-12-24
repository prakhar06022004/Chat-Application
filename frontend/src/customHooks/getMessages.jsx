import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../context/ContextApi";
import { useContext, useEffect } from "react";
import { setMessages } from "../redux/messageSlice";   // FIX

const GetMessages = () => {
  const { selectedUser } = useSelector((state) => state.user);   // FIX
  const dispatchRedux = useDispatch();
  const { serverUrl } = useContext(UserContext);

  useEffect(() => {
    if (!selectedUser) return; // FIX

    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `${serverUrl}/message/receive/${selectedUser._id}`,
          { withCredentials: true }
        );

        // SET MESSAGES CORRECTLY IN messageSlice
        dispatchRedux(setMessages(data));  // FIX
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchMessages();
  }, [selectedUser]);   // ONLY selectedUser is needed
};

export default GetMessages;
