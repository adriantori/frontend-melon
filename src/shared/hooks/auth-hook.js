<<<<<<< HEAD
import { useState, useCallback, useEffect } from 'react';

let logoutTimer

export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpiration] = useState();
    const [userId, setUserId] = useState(false);
  
    const login = useCallback((uid, token, expirationDate) => {
      setToken(token);
      setUserId(uid);
      const tokenExpirationDate = expirationDate || new Date( new Date().getTime() + 1000 * 60 * 60); //generate date 1 hour (same as token exp)
      setTokenExpiration(tokenExpirationDate);
      localStorage.setItem(
        'userData', 
        JSON.stringify({
          userId: uid, 
          token: token,
          expiration : tokenExpirationDate.toISOString() //store exact date as string, can be returned as date data
        })); //save token in local storage
    }, []);
  
    const logout = useCallback(() => {
      setToken(null);
      setTokenExpiration(null);
      setUserId(null);
      localStorage.removeItem('userData');
    }, []);
  
    useEffect(() => {
      if(token && tokenExpirationDate){
        const remainingTime = tokenExpirationDate - new Date().getTime();
        logoutTimer = setTimeout(logout, remainingTime);
      }else{
        clearTimeout(logoutTimer);
      }
    }, [token, logout, tokenExpirationDate]);
  
    useEffect(() => { //keep user logged in
      const storedData = JSON.parse(localStorage.getItem('userData')); //get current user data
      if (storedData && storedData.token && new Date(storedData.expiration) > new Date()){
        login(storedData.userId, storedData.token, new Date(storedData.expiration));
      }
    }, [login]);

    return { token, login, logout, userId };
=======
import { useState, useCallback, useEffect } from 'react';

let logoutTimer

export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpiration] = useState();
    const [userId, setUserId] = useState(false);
  
    const login = useCallback((uid, token, expirationDate) => {
      setToken(token);
      setUserId(uid);
      const tokenExpirationDate = expirationDate || new Date( new Date().getTime() + 1000 * 60 * 60); //generate date 1 hour (same as token exp)
      setTokenExpiration(tokenExpirationDate);
      localStorage.setItem(
        'userData', 
        JSON.stringify({
          userId: uid, 
          token: token,
          expiration : tokenExpirationDate.toISOString() //store exact date as string, can be returned as date data
        })); //save token in local storage
    }, []);
  
    const logout = useCallback(() => {
      setToken(null);
      setTokenExpiration(null);
      setUserId(null);
      localStorage.removeItem('userData');
    }, []);
  
    useEffect(() => {
      if(token && tokenExpirationDate){
        const remainingTime = tokenExpirationDate - new Date().getTime();
        logoutTimer = setTimeout(logout, remainingTime);
      }else{
        clearTimeout(logoutTimer);
      }
    }, [token, logout, tokenExpirationDate]);
  
    useEffect(() => { //keep user logged in
      const storedData = JSON.parse(localStorage.getItem('userData')); //get current user data
      if (storedData && storedData.token && new Date(storedData.expiration) > new Date()){
        login(storedData.userId, storedData.token, new Date(storedData.expiration));
      }
    }, [login]);

    return { token, login, logout, userId };
>>>>>>> 3a633ae4fabc7ecd305595adb4bce88f41839c8f
}