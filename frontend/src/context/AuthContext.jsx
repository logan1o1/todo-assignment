import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext  = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(localStorage.getItem("auth_user") || null);

    function login(userId) {
        localStorage.setItem("auth_user", userId);
        setAuthUser(userId);
    };

    function logout() {
        localStorage.removeItem("auth_user");
        setAuthUser(null);
    };

    return  (
        <AuthContext.Provider value={{ authUser, login, logout }}>
        {children}
        </AuthContext.Provider>
    )
}