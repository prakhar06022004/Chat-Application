import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import GetCurrentUser from "./customHooks/getCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  GetCurrentUser();
  const { userData } = useSelector((state) => state.user);
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
