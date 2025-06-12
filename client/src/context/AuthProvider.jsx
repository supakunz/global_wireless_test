/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { getAlluser, signIn, signUp } from "../service/useService";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allusers, setAllusers] = useState([]);
  const [usersData, setUsersData] = useState(null);

  const login = async (data, type) => {
    const toastId = toast.loading("Please wait...");
    try {
      const required = type == "Login" ? signIn(data) : signUp(data);
      const response = await required;
      if (response.success) {
        localStorage.setItem("auth-token", response.token);
        setIsAuthenticated(true);
        const decoded = jwtDecode(response.token);
        console.log(decoded.user);
        setUsersData(decoded.user); // สมมติว่ามี useState หรือ context
        toast.update(toastId, {
          render: `${type} successful`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
          theme: "colored",
        });
        return decoded.user.role;
      } else {
        throw new Error(response.errors || "Login failed");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Login error", { theme: "colored" });
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth-token");
    setUsersData(null);
    toast.dismiss();
    toast.success("Logout successful", {
      theme: "colored",
    });
  };

  const getAllUsers = async () => {
    try {
      const data = await getAlluser();
      setAllusers(data);
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        getAllUsers,
        allusers,
        usersData,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
