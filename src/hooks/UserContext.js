import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const initialData = {isLoggedIn:false,email:''};
  const [loginData,setLoginData] = useState(initialData);
  return (
    <UserContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </UserContext.Provider>
  );
};