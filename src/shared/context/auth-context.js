<<<<<<< HEAD
import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false, 
    userId: null,
    token: null,
    login: () => {}, 
    logout: () => {}
=======
import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false, 
    userId: null,
    token: null,
    login: () => {}, 
    logout: () => {}
>>>>>>> 3a633ae4fabc7ecd305595adb4bce88f41839c8f
});