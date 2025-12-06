import { useState } from "react";
import { createContext } from "react";
  export const UserContext = createContext();

function ContextApi({ children }) {
  const serverUrl = "http://localhost:8000";
const [loading,setLoading] = useState(false)

  return (
    <UserContext.Provider value={{ serverUrl,loading,setLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export default ContextApi;
