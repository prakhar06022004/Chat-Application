import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/ContextApi";
import { HashLoader } from "react-spinners";

function LogIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl,loading,setLoading } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { data } = await axios.post(
        serverUrl + "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(data);
      setEmail("")
      setPassword("")
    } catch (error) {
      console.log(error.message);
    }
    finally{
        setLoading(false)
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center p-2">
      <div className="w-full max-w-[500px] h-[500px] border-2 border-[#20c7ff] shadow-xl shadow-gray-300 rounded-[10px] flex flex-col overflow-hidden select-none">
        <div className="bg-[#20c7ff] w-full sm:h-[150px] h-[120px] rounded-b-full flex justify-center items-center text-center">
          <h1 className="font-lobster sm:text-4xl text-3xl sm:mb-0 mb-5 font-bold">
            Welcome to <span className="text-[#ededed]">Pakhiii</span>
          </h1>
        </div>
        <form
          className="flex flex-col justify-center items-center w-full mt-4 gap-5 px-2"
          onSubmit={handleLogIn}
        >
          <input
            type="email"
            id=""
            placeholder="Email"
            className="    w-full p-2 rounded-2xl outline-none
    border border-[#20c7ff]
    focus:border-[#20c7ff]
    focus:ring-1 focus:ring-[#20c7ff]
    transition-all duration-300"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              id=""
              placeholder="Password"
              className="w-full p-2 rounded-2xl outline-none
    border border-[#20c7ff]
    focus:border-[#20c7ff]
    focus:ring-1 focus:ring-[#20c7ff]
    transition-all duration-300 relative"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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

          <button
            className="bg-[#20c7ff] py-2 px-4 cursor-pointer rounded-3xl text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? <HashLoader size={20} color="white"/> : "LogIn"}
            
          </button>
          <p className="underline text-gray-600 cursor-pointer">
            Does not have an account?
            <span className="text-blue-700" onClick={() => navigate("/signup")}>
              SignUp?
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
