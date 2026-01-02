import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import GetCurrentUser from "./customHooks/getCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "./context/ContextApi";
import { ScaleLoader } from "react-spinners";
import GetOtherUser from "./customHooks/getOtherUsers";
import { io } from "socket.io-client";
import { setOnlineUsers, setSocket } from "./redux/userSlice";

function App() {
  GetCurrentUser();
  GetOtherUser();

  const { serverUrl, authLoading } = useContext(UserContext);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // 🔐 socket reference (single instance)
  const socketRef = useRef(null);

  useEffect(() => {
    // jab tak user login na ho, socket mat banao
    if (!userData?._id) return;

    const socket = io(serverUrl, {
      query: {
        userId: userData._id,
      },
      withCredentials: true,
    });

    socketRef.current = socket;
    dispatch(setSocket(socket));

    console.log("Socket connected:", userData._id);

    // 🔔 listen online users
    socket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    // 🧹 cleanup (logout / refresh / unmount)
    return () => {
      socket.off("getOnlineUsers");
      socket.disconnect();
      socketRef.current = null;
      console.log("Socket disconnected");
    };
  }, [userData?._id, serverUrl, dispatch]);

  if (authLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <ScaleLoader size={30} color="#525252" />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/profile" />}
      />
      <Route
        path="/login"
        element={!userData ? <LogIn /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to="/signup" />}
      />
    </Routes>
  );
}

export default App;
