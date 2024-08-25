import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setisAuthenticated(true);
      setErrors([]); // Clear errors on successful signup
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setisAuthenticated(true);
      setErrors([]); // Clear errors on successful signin
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]); // Clear errors after 5 seconds if any exist
      }, 5000);
      return () => {
        clearTimeout(timer); // Clear timer on unmount
      };
    }
  }, [errors]);

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setisAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setisAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        
        if (!res.data) {
          
          setLoading(false);
          setisAuthenticated(false);
          return ;
        }
        
        setisAuthenticated(true);
        setUser(res.data.data);
        setLoading(false);
        console.log(res.data.data);
      } catch (error) {
        setisAuthenticated(false);
        //setUser(null);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        user,
        isAuthenticated,
        errors,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
