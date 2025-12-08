import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../context/ContextApi";
import { useContext, useEffect } from "react";
import { setUserData } from "../redux/userSlice";

const GetCurrentUser = () => {
  const { serverUrl } = useContext(UserContext);
  const dispatchRedux = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(serverUrl + "/user/getcurrent", {
          withCredentials: true,
        });
        dispatchRedux(setUserData(data));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, [userData]);
};

export default GetCurrentUser;
