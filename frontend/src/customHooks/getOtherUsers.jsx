import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../context/ContextApi";
import { useContext, useEffect } from "react";
import { setOtherUser } from "../redux/userSlice";

const GetOtherUser = () => {
  const { userData } = useSelector((state) => state.user);
  const { serverUrl, setOthersLoading } = useContext(UserContext);
  const dispatchRedux = useDispatch();
  useEffect(() => {
    if (!userData) return; // ⛔ wait until login

    const fetchUser = async () => {
      try {
        const { data } = await axios.get(serverUrl + "/user/getOtherUsers", {
          withCredentials: true,
        });
        dispatchRedux(setOtherUser(data));
      } catch (error) {
        console.log(error.message);
      } finally {
        setOthersLoading(false);
      }
    };
    fetchUser();
  }, [userData]);
};

export default GetOtherUser;
