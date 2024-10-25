import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);

    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        const savedToken = localStorage.getItem("token");
        if (savedUser && savedToken) {
            setUser(savedUser);
            setToken(savedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const UseAuth = () => {
    return useContext(AuthContext);
};


