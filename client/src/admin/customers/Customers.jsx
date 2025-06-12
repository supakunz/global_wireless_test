/* eslint-disable react-hooks/exhaustive-deps */
// import { useContext } from "react";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import "./customers.css";

const Customers = () => {
  const { allusers, getAllUsers, token } = useAuth(); // เรียกใช้ user data ใน store

  useEffect(() => {
    if (allusers.length === 0) {
      getAllUsers(token || localStorage.getItem("auth-token"));
    }
  }, []);

  return (
    <>
      <div className="list-product flex flex-col items-center w-full h-full p-[10px_50px] m-[30px] rounded-[6px] bg-white">
        <div className="w-full relative mb-4">
          <div className="flex flex-col items-center justify-center lg:relative">
            <h1 className="text-xl font-semibold text-center lg:text-center">
              All Products List
            </h1>
            <Link
              to="add"
              className="mt-2 lg:mt-0 lg:absolute lg:right-4 lg:top-[70%] lg:-translate-y-1/2 bg-[#6079ff] hover:bg-[#4d65e5] text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              + Add User
            </Link>
          </div>
        </div>

        <div className="listproduct-format-main grid grid-cols-4 text-[15px] font-medium gap-[10px] w-full py-[20px] text-[#454545]">
          <p>Username</p>
          <p>Email</p>
          <p>Role</p>
          <p>Details</p>
        </div>
        <div className="listproduct-allproducts w-full overflow-y-auto max-h-[64vh]">
          <hr />
          {allusers.map((users, index) => {
            return (
              <>
                <div
                  key={index}
                  className="listproduct-format-main listproduct-format grid grid-cols-4 text-[15px] font-medium gap-[10px] w-full py-[20px] text-[#454545] items-center"
                >
                  <p>{users.name}</p>
                  <p>{users.email}</p>
                  <p>{users.role}</p>
                  <Link to={`${users.id}`}>
                    <p className="cursor-pointer">edit</p>
                  </Link>
                </div>
                <hr />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Customers;
