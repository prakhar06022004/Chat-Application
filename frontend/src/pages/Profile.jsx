import { use, useContext, useRef, useState } from "react";
import emptyImage from "../assets/emptyImage.png";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/ContextApi";
import { HashLoader, ScaleLoader } from "react-spinners";
import { setUserData } from "../redux/userSlice";

function Profile() { 
   const ref = useRef();
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  const { setLoading, loading,serverUrl } = useContext(UserContext);
  const { userData } = useSelector((state) => state.user);
  const [frontendImage, setFrontendImage] = useState(userData?.image || "");
  const [backendImage, setBackendImage] = useState(userData?.image || "");
  const [name, setName] = useState(userData?.name || "");

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("backendImage", backendImage);

    try {
      const { data } = await axios.put(serverUrl + "/user/profile", formData, {
        withCredentials: true,
      });
      dispatchRedux(setUserData(data));
      console.log(data?.data);
      navigate("/")
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

 if (!userData) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ScaleLoader size={30} color="#525252" />
    </div>
  );
}
  return (
    <>
      <div className="w-full h-screen bg-slate-200 flex justify-center items-center flex-col">
        <div
          className="fixed top-7 left-7 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaArrowLeftLong size={20} />
        </div>
        <div className="w-full max-w-[600px] h-full sm:mt-0 mt-5 sm:h-[600px] flex flex-col items-center sm:border-[#20c7ff] border-none border shadow-lg rounded px-5">
          <h1 className="font-margarine text-2xl">Profile Page</h1>
          <input
            type="file"
            accept="image/*"
            ref={ref}
            className="hidden"
            onChange={handleImage}
          />

          <div
            className="w-[100px] h-[100px] overflow-hidden rounded-full bg-white border-3 border-[#20c7ff] mb-5 mt-5 cursor-pointer relative"
            onClick={() => ref.current.click()}
          >
            <img
              src={frontendImage || emptyImage}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 bg-black/20 flex items-center justify-center
               opacity-0 hover:opacity-100 transition-opacity duration-200
               rounded-full"
            >
              <span className="text-white text-3xl font-bold">+</span>
            </div>
          </div>

          <form className="flex flex-col gap-7 w-full" onSubmit={handleProfile}>
            <input
              type="text"
              placeholder="Enter your name..."
              className="w-full p-2 rounded-2xl outline-none border border-[#20c7ff] focus:border-[#20c7ff] focus:ring-1 focus:ring-[#20c7ff] transition-all duration-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              readOnly
              value={userData?.username || ""}
              className="w-full p-2 rounded-2xl outline-none border border-[#20c7ff] focus:border-[#20c7ff] text-gray-500 hover:cursor-not-allowed"
              
            />
            <input
              type="email"
              readOnly
              value={userData?.email || ""}
              className="w-full p-2 rounded-2xl outline-none border border-[#20c7ff] focus:border-[#20c7ff] text-gray-500 hover:cursor-not-allowed"
            />
            <button  type="submit"

              className="bg-[#20c7ff] text-white p-2 rounded cursor-pointer flex justify-center"
            >
              {loading ? (
                <HashLoader size={20} color="white" />
              ) : (
                "Save Profile"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
