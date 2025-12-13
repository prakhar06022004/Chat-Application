import { useState } from "react";
import { createContext } from "react";
export const UserContext = createContext();

function ContextApi({ children }) {
  const serverUrl = "http://localhost:8000";
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
const [othersLoading,setOthersLoading] = useState(true)
  return (
    <UserContext.Provider
      value={{ serverUrl, loading, setLoading, authLoading, setAuthLoading,othersLoading,setOthersLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default ContextApi;
