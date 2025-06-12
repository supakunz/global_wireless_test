/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthProvider";
import {
  updateUser,
  deleteUser,
  getUserById,
  signUp,
} from "../../service/useService";
import { z } from "zod";

const createUserSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9]+$/, { message: "No special chars" }),
  email: z.string().email(),
  password: z
    .string()
    .min(7)
    .regex(/^[a-zA-Z0-9_-]+$/, { message: "Password valid chars only" }),
  role: z.enum(["user", "admin"]),
});

const updateUserSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9]+$/, { message: "No special chars" })
    .optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .optional()
    .refine(
      (val) =>
        val === undefined ||
        val === "" ||
        (val.length >= 7 && /^[a-zA-Z0-9_-]+$/.test(val)),
      {
        message:
          "Password must be at least 7 characters and contain only letters, numbers, _ and -",
      }
    ),
  role: z.enum(["user", "admin"]).optional(),
});

const CustomerEdit = ({ type }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAllUsers, token } = useAuth();
  const [usersDetails, setusersDetails] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [errors, setErrors] = useState({});

  // GetData from productID
  const fectInfo = async () => {
    try {
      const data = await getUserById(
        id,
        token || localStorage.getItem("auth-token")
      );
      setusersDetails({
        name: data?.name || "",
        email: data?.email || "",
        password: "",
        role: data?.role || "user",
      });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  // GetData from productID
  const updateInfo = async () => {
    Swal.fire({
      title: `${
        id != "add"
          ? "Do you want to save the changes?"
          : "Do you want to create user?"
      }`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `${id != "add" ? "Save" : "Add"}`,
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // เรียก validate
        const validateResult =
          id === "add"
            ? createUserSchema.safeParse(usersDetails)
            : updateUserSchema.safeParse(usersDetails);

        // ถ้า validate ไม่ผ่าน
        if (!validateResult.success) {
          // ดึง error message มาทำ object แบบ { name: "message", email: "message" }
          const fieldErrors = {};
          validateResult.error.issues.forEach((issue) => {
            fieldErrors[issue.path[0]] = issue.message;
          });
          setErrors(fieldErrors);
          return; // ไม่รันต่อ
        }

        setErrors({}); // เคลียร์ errors

        Swal.fire({
          title: "Loading...",
          html: "Please wait...",
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading(null);
          },
        });
        try {
          const payload = {
            username: usersDetails.name,
            email: usersDetails.email,
            password: usersDetails.password,
            role: usersDetails.role,
          };
          // ป้องกันการส่ง password ค่าเป็น null
          if (!payload.password) delete payload.password;

          const required =
            id != "add"
              ? updateUser(
                  id,
                  payload,
                  token || localStorage.getItem("auth-token")
                )
              : signUp(payload);

          await required;
          Swal.close();
          Swal.fire(
            `${id != "add" ? "Updated successfully" : "Created successfully"}!`,
            "",
            "success"
          );
          getAllUsers(token || localStorage.getItem("auth-token"));
          navigate(-1);
        } catch (error) {
          console.log(error);
          Swal.close();
          Swal.fire(
            `${id != "add" ? "Update failed" : "Create failed"}!`,
            error.message || "Something went wrong",
            "error"
          );
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  // Delete Data from productID
  const remove_product = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleting...",
          html: "Please wait...",
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => Swal.showLoading(null),
        });

        try {
          await deleteUser(id, token || localStorage.getItem("auth-token"));
          Swal.close();
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
          });
          getAllUsers(token || localStorage.getItem("auth-token"));
          navigate(-1);
        } catch (error) {
          console.log(error);
          Swal.close();
          Swal.fire("Delete failed!", "", "error");
        }
      }
    });
  };

  // Function get data จาก form
  const changeHandler = (e) => {
    setusersDetails({ ...usersDetails, [e.target.name]: e.target.value });
    console.log(usersDetails);
  };

  useEffect(() => {
    if (id === "add") return;
    fectInfo();
  }, [id]);

  return (
    <>
      <div className="add-product box-border w-full max-w-[800px] p-[30px_50px] m-[20px_30px] rounded-[6px] bg-white">
        <div className="product-itemfield flex flex-col gap-3 w-full text-[#7b7b7b] text-[16px]">
          <p>Username</p>
          <input
            className="box-border w-full h-[50px] rounded-[4px] pl-[15px] border-solid border-[1px] text-[14px] border-[#c3c3c3] text-[#7b7b7b]"
            onChange={changeHandler}
            type="text"
            value={usersDetails.name}
            name="name"
            placeholder="Type here"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="addproduct-price flex gap-[40px]">
          <div className="addproduct-itemfield flex flex-col gap-3 mt-3 w-full text-[#7b7b7b] text-[16px]">
            <p>Email</p>
            <input
              className="box-border w-full h-[50px] rounded-[4px] pl-[15px] border-solid border-[1px] text-[14px] border-[#c3c3c3] text-[#7b7b7b]"
              onChange={changeHandler}
              type="email"
              value={usersDetails.email}
              name="email"
              placeholder="Type here"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="addproduct-itemfield w-full flex flex-col mt-3 gap-3 text-[#7b7b7b] text-[16px]">
            <p>New Password</p>
            <input
              className="box-border w-full h-[50px] rounded-[4px] pl-[15px] border-solid border-[1px] text-[14px] border-[#c3c3c3] text-[#7b7b7b]"
              onChange={changeHandler}
              type="text"
              value={usersDetails.password}
              name="password"
              placeholder="Type here"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
        </div>
        <div className="addproduct-itemfield w-full mt-3 flex flex-col gap-3 text-[#7b7b7b] text-[16px]">
          <p>Role</p>
          <select
            name="role"
            onChange={changeHandler}
            value={usersDetails.role}
            className="add-product-selector p-[10px] w-[100px] h-[50px] text-[14px] border-solid border-[1px] border-[#7b7b7b8b] rounded-[4px]"
          >
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>
        <div className="flex gap-5 mt-5">
          <button
            onClick={updateInfo}
            className="addproduct-btn mt-[3px] w-[160px] h-[50px] rounded-[6px] bg-[#6079ff] border-none cursor-pointer text-white text-[16px] font-medium"
          >
            {id != "add" ? "UPDATE" : "ADD"}
          </button>
          {id != "add" && (
            <button
              onClick={remove_product}
              className="addproduct-btn mt-[3px] w-[160px] h-[50px] rounded-[6px] bg-red-500 border-none cursor-pointer text-white text-[16px] font-medium"
            >
              DELETE
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerEdit;
