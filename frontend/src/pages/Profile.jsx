import { useRef, useState } from "react";
import emptyImage from "../assets/emptyImage.png";
import { useSelector } from "react-redux";
function Profile() {
  const { userData } = useSelector((state) => state.user);
  const [frontendImage, setFrontendImage] = useState("");
  const [backendImage, setBackendImage] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const ref = useRef();
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };
  // const formData = new FormData();
  // formData.append(name)

  return (
    <div className="w-full h-screen bg-slate-200 flex justify-center items-center flex-col">
      <div className="w-full max-w-[600px] h-full sm:mt-0 mt-5 sm:h-[600px] flex flex-col items-center sm:border-[#20c7ff] border-none border shadow-lg rounded p-5">
        <input
          type="file"
          accept="image/*"
          ref={ref}
          className="hidden"
          onChange={handleImage}
        />

        <div className="w-[100px] h-[100px] overflow-hidden rounded-full bg-white border-3 border-[#20c7ff] mb-5 cursor-pointer"
          onClick={() => ref.current.click()}>
          <img src={frontendImage || emptyImage} className="w-full h-full object-cover"/>
        </div>

        <form className="flex flex-col gap-7 w-full">
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
            value={userData?.username}
            className="w-full p-2 rounded-2xl outline-none border border-[#20c7ff] focus:border-[#20c7ff] text-gray-500 hover:cursor-not-allowed"
          />
          <input
            type="email"
            readOnly
            value={userData?.email}
            className="w-full p-2 rounded-2xl outline-none border border-[#20c7ff] focus:border-[#20c7ff] text-gray-500 hover:cursor-not-allowed"
          />
          <button className="bg-[#20c7ff] text-white p-2 rounded cursor-pointer">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
