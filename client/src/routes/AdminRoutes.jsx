import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Sidebar from "../admin/navbar/sidebar/Sidebar";
import Customers from "../admin/customers/Customers";
import CustomerEdit from "../admin/customers/CustomerEdit";
import Dashboard from "../admin/dashboard/Dashboard";

function AdminRoutes() {
  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row bg-[#F6F6F6] min-h-[89vh]">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers">
            <Route index element={<Customers />} />
            <Route path="adduser" element={<CustomerEdit type={"add"} />} />
            <Route path=":id" element={<CustomerEdit type={"update"} />} />
          </Route>
          {/* เพิ่มเส้นทางอื่นๆ ที่ Admin เข้าถึงได้ */}
        </Routes>
      </div>
    </AdminLayout>
  );
}

export default AdminRoutes;
