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
  const [token, setToken] = useState(null);

  const login = async (data, type) => {
    const toastId = toast.loading("Please wait...");
    try {
      const required = type == "Login" ? signIn(data) : signUp(data);
      const response = await required;
      if (response.success) {
        localStorage.setItem("auth-token", response.token);
        setIsAuthenticated(true);
        setToken(response.setToken);
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
    setToken(null);
    setUsersData(null);
    toast.dismiss();
    toast.success("Logout successful", {
      theme: "colored",
    });
  };

  const getAllUsers = async (tokenKey) => {
    try {
      const data = await getAlluser(tokenKey);
      if (Array.isArray(data)) {
        setAllusers(data);
      } else if (data && typeof data === "object" && data.users) {
        // ถ้า API response แบบ { users: [...] }
        setAllusers(data.users);
      } else {
        setAllusers([]); // กรณีอื่นๆ กำหนดเป็น array ว่าง
      }
    } catch (err) {
      console.log("Error", err);
      setAllusers([]); // ป้องกันค้างค่าเดิม
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
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
