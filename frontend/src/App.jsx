import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import GetCurrentUser from "./customHooks/getCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { UserContext } from "./context/ContextApi";
import { ScaleLoader	 } from "react-spinners";
import GetOtherUser from "./customHooks/getOtherUsers";
function App() {
  GetCurrentUser();
  GetOtherUser();
  const { authLoading } = useContext(UserContext);
  const { userData } = useSelector((state) => state.user);
  if (authLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <ScaleLoader size={30} color="#525252" className=""/>
      </div>
    );
  }
  return (
    <>
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
    </>
  );
}

export default App;
