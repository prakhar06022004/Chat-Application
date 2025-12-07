import { useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/ContextApi";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { FcGoogle } from "react-icons/fc";
import { useAuth0 } from "@auth0/auth0-react";

function SignUp() {
  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();
  const { serverUrl, loading, setLoading } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  // Auto redirect to Google login if you want
  // Uncomment this if you want page load -> direct Google login
  // useEffect(() => {
  //   loginWithRedirect({
  //     connection: "google-oauth2",
  //     redirectUri: window.location.origin,
  //   });
  // }, []);

  const handleGoogleLogin = async () => {
    try {
      // Direct Google login, hosted page bypass
      await loginWithRedirect({
        connection: "google-oauth2",
        redirectUri: window.location.origin,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        serverUrl + "/auth/signup",
        { username: userName, email, password },
        { withCredentials: true }
      );
      console.log(data);
      setUserName("");
      setEmail("");
      setPassword("");
      navigate("/login"); // Redirect after successful signup
    } catch (error) {
      console.log(error.message);
      setErr(error.response?.data?.message || "Something went wrong");
      setTimeout(() => setErr(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center p-2">
      <div className="w-full max-w-[500px] sm:h-[600px] h-full border-2 border-[#20c7ff] shadow-xl shadow-gray-300 rounded-[10px] flex flex-col overflow-hidden select-none ">
        <div className="bg-[#20c7ff] w-full sm:h-[150px] h-[120px] rounded-b-full flex justify-center items-center text-center">
          <h1 className="font-lobster sm:text-4xl text-3xl sm:mb-0 mb-5 font-bold">
            Welcome to <span className="text-[#ededed]">Pakhiii</span>
          </h1>
        </div>
        <form
          className="flex flex-col justify-center items-center w-full mt-4 sm:gap-5 gap-7 px-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 rounded-2xl outline-none border border-[#20c7ff] focus:border-[#20c7ff] focus:ring-1 focus:ring-[#20c7ff] transition-all duration-300"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded-2xl outline-none border border-[#20c7ff] focus:border-[#20c7ff] focus:ring-1 focus:ring-[#20c7ff] transition-all duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 rounded-2xl outline-none border border-[#20c7ff] focus:border-[#20c7ff] focus:ring-1 focus:ring-[#20c7ff] transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FaEyeSlash
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaRegEye
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          {err && <p className="text-red-500">{err}</p>}
          <div className="flex flex-col items-center gap-3 sm:gap-6">
            <button
              className="bg-[#20c7ff] py-2 px-4 cursor-pointer rounded-3xl text-white"
              type="submit"
              disabled={loading}
            >
              {loading ? <HashLoader size={20} color="white" /> : "SignUp"}
            </button>
            <p className="text-gray-600">OR</p>
            <button
              className="flex justify-center items-center gap-2 border-gray-600 rounded py-1 px-5 shadow-md"
              type="button"
              onClick={handleGoogleLogin}
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>
          </div>

          <p className="underline text-gray-600 cursor-pointer mt-3">
            Already have an account?{" "}
            <span
              className="text-blue-700"
              onClick={() => navigate("/login")}
            >
              Login?
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
