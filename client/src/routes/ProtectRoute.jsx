/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import jwtDecode from "jwt-decode";

const ProtectRoute = ({ children, role }) => {
  const { isAuthenticated } = useAuth(); // ตรวจสอบสิทธิ์
  const token = localStorage.getItem("auth-token");

  // -------- ** ตรวจสอบการ Login และแยก Role ----------
  // 1.เมื่อไม่มี token และ ไม่ login
  if (!token && !isAuthenticated) {
    console.error("No token found");
    return <Navigate to="/login" replace />;
  }

  // 2.เมื่อมี token #login
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    // ตรวจสอบเวลา token กับเวลาจริง
    if (decoded.exp < currentTime) {
      // console.error("Token has expired");
      localStorage.removeItem("auth-token");
      return <Navigate to="/login" replace />;
    }

    // ตรวจสอบสิทธิ์การเข้าถึง
    const userRole = decoded.user?.role;
    if (role && userRole !== role) {
      return <Navigate to="/" replace />;
    }
    return children;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectRoute;
