import axios from "axios";
import { useDispatch } from "react-redux";
import { UserContext } from "../context/ContextApi";
import { useContext, useEffect } from "react";
import { setUserData } from "../redux/userSlice";

const GetCurrentUser = () => {
  const { serverUrl, setAuthLoading } = useContext(UserContext);
  const dispatchRedux = useDispatch();
  useEffect(() => {
    setAuthLoading(true)

    const fetchUser = async () => {
      try {
        const { data } = await axios.get(serverUrl + "/user/getcurrent", {
          withCredentials: true,
        });
        dispatchRedux(setUserData(data));
      } catch (error) {
        console.log(error.message);
      } finally {
        setAuthLoading(false);
      }
    };
    fetchUser();
  }, []);
};

export default GetCurrentUser;
