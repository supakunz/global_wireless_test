import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const { usersData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // <- เรียกฟังก์ชัน logout จาก context/store
    navigate("/login"); // <- พาไปหน้า login
  };

  return (
    <div className="bg-gray-100 p-6 rounded-2xl">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Welcome, {usersData?.name || "User"} 👋
          </h1>
          <p className="text-gray-500">This is your personal dashboard.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-100 rounded-xl p-5 shadow">
              <h3 className="text-lg font-medium text-blue-700">
                Account Info
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Email: <span className="font-medium">{usersData?.email}</span>
              </p>
              <p className="text-sm text-gray-600">
                Role:{" "}
                <span className="font-medium capitalize">
                  {usersData?.role}
                </span>
              </p>
            </div>

            <div className="bg-green-100 rounded-xl p-5 shadow">
              <h3 className="text-lg font-medium text-green-700">
                Your Activities
              </h3>
              <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
                <li>View history</li>
                <li>Orders</li>
                <li>Wishlist</li>
              </ul>
            </div>

            <div className="bg-purple-100 rounded-xl p-5 shadow">
              <h3 className="text-lg font-medium text-purple-700">
                Quick Actions
              </h3>
              <button
                onClick={() => navigate("/profile")}
                className="mt-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
