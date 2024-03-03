import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const initialData = { isLoggedIn: false, email: '' };
  const [loginData, setLoginData] = useState(initialData);

  useEffect(() => {
    const updateUserData = async () => {
      if (loginData.isLoggedIn) {
        const user_jwtToken = Cookies.get('user_jwtToken');
        if (user_jwtToken) {
          try {
            const response = await axios.get(process.env.REACT_APP_LOGIN_SERVICE + "/get-user-details-from-token", {
              headers: {
                'Authorization': `Bearer ${user_jwtToken}`
              }
            });
            console.log('/get-user-details-from-token', response);
            setUser(response.data.userDetails[0]); 
          } catch (error) {
            console.error('Error fetching user details:', error);
            logOutUser();
          }
        } else {
          console.log('JWT Token is not present');
          logOutUser()
        }
      }
    }

    updateUserData();
  }, [loginData]);

  const logOutUser = useCallback(async () => {
    Cookies.remove('user_jwtToken');
    setLoginData({ isLoggedIn: false, email: '' })
    setUser(null)
  })

  return (
    <UserContext.Provider value={{ loginData, setLoginData, logOutUser, user }}>
      {children}
    </UserContext.Provider>
  );
};