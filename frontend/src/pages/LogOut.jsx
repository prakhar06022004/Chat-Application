// import React, { useContext } from "react";
// import { UserContext } from "../context/ContextApi";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { logout } from "../redux/userSlice";

// function LogOut() {
//   const { serverUrl } = useContext(UserContext);
//   const dispatchRedux = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         serverUrl + "/auth/logout",
//         {},
//         { withCredentials: true }
//       );

//       dispatchRedux(logout()); // ab ye kaam karega ✔️
//       navigate("/login");
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <div className="w-full h-screen flex justify-center items-center">
//       <button
//         className="bg-black text-white p-2 rounded cursor-pointer hover:bg-gray-700"
//         onClick={handleLogout}
//       >
//         LOGOUT
//       </button>
//       <h1>LogOut Page</h1>
//     </div>
//   );
// }

// export default LogOut;
