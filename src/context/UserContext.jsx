// src/context/UserContext.jsx

import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// ✅ Named context export (good)
export const userDataContext = createContext();

// ✅ Named provider component export (good)
export const UserProvider = ({ children }) => {
  const serverUrl = "https://chatbot-backend-git-main-saurabh-singhs-projects-a1962278.vercel.app";
  const [userData, setUserdata] = useState(null);

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
        withCredentials: true,
      });
      setUserdata(result.data);
      console.log(result.data);
    } catch (error) {
      console.log("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  return (
    <userDataContext.Provider value={{ serverUrl, userData, setUserdata }}>
      {children}
    </userDataContext.Provider>
  );
};
