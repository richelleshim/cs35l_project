
import React, { createContext, useContext, useState } from "react";

// Create a context for the user profile
const UserProfileContext = createContext();

// Custom hook to consume the user profile context
export const useUserProfile = () => useContext(UserProfileContext);

// Provider component to wrap your application and provide the user profile state
export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};
