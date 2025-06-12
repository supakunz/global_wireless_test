import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const GuardRoute = ({ children }) => {
  const token = localStorage.getItem("auth-token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp > currentTime) {
        const role = decoded.user?.role;
        return <Navigate to={role === "admin" ? "/admin" : "/user"} replace />;
      } else {
        localStorage.removeItem("auth-token");
      }
    } catch (error) {
      localStorage.removeItem("auth-token");
    }
  }

  return children;
};

export default GuardRoute;
