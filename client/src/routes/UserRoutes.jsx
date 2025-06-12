import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import LoginSignup from "../pages/LoginSingup";
import NotFound from "../pages/NotFound";
import UserHome from "../pages/๊UserHome";
// import UserLayoutLogin from "../layout/UserLayoutLogin";
import ProtectRoute from "./ProtectRoute";
import GuardRoute from "./GuardRoute";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route
          path="login"
          element={
            <GuardRoute>
              <LoginSignup />
            </GuardRoute>
          }
        />
        <Route
          path="user"
          element={
            <ProtectRoute role={"user"}>
              <UserHome />
            </ProtectRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
