/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./css/loginsingup.css";
import Input from "../components/common/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must contain at least 3 character(s)")
    .max(20, "Username must be no more than 20 characters(s)")
    .regex(/^[a-zA-Z0-9]+$/, {
      // อนุญาตเฉพาะตัวอักษรและตัวเลข
      message: "Username must not contain special characters",
    })
    .optional(),
  email: z.string().email(),
  password: z
    .string()
    .min(7)
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Password can contain only letters, numbers, _ and -",
    }),
});

const LoginSingup = () => {
  const [state, setState] = useState("Login");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsCursorVisible(false); // ทำให้เคอร์เซอร์หาย
    }
  };

  const handleFocus = () => {
    setIsCursorVisible(true); // เคอร์เซอร์กลับมาหลังจากการคลิก
  };

  // เก็บค่าจาก useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsCursorVisible(false);
      const role = await login(data, state); // เรียก login จาก
      reset();
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      console.error(err);
      reset();
    } finally {
      setIsCursorVisible(true);
    }
  };

  return (
    <div className="loginsignup w-[100%] py-[60px] ">
      <div className="loginsignup-container w-full max-w-[580px] min-h-[600px] rounded-lg bg-white m-auto p-[32px_60px]">
        <h1 className="text-[30px] font-medium mt-[15px]">{state}</h1>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div className="loginsignup-fields flex flex-col gap-[29px] mt-[30px]">
            {state === "Sing Up" ? (
              <Input
                name={"username"}
                type={"text"}
                placeholder={"Your Name"}
                register={register}
                error={errors?.username?.message}
                handleKeyDown={handleKeyDown}
                handleFocus={handleFocus}
                isCursorVisible={isCursorVisible}
              />
            ) : null}
            <Input
              name={"email"}
              // type={"email"}
              placeholder={"Email Address"}
              register={register}
              error={errors?.email?.message}
              handleKeyDown={handleKeyDown}
              handleFocus={handleFocus}
              isCursorVisible={isCursorVisible}
            />
            <Input
              name={"password"}
              type={"password"}
              placeholder={"Password"}
              register={register}
              error={errors?.password?.message}
              handleKeyDown={handleKeyDown}
              handleFocus={handleFocus}
              isCursorVisible={isCursorVisible}
            />
          </div>
          <button
            type="submit"
            className="w-[100%] rounded-lg h-[62px] text-white bg-black mt-[30px] border-none text-[18px] font-medium cursor-pointer"
          >
            Continue
          </button>
        </form>
        {state === "Sing Up" ? (
          <p className="loginsignup-login mt-[20px] text-[#5c5c5c] text-[14px] font-medium">
            Already have an account{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
              className="text-[#ff4141] font-semibold cursor-pointer"
            >
              {" "}
              Login here{" "}
            </span>
          </p>
        ) : (
          <p className="loginsignup-login mt-[20px] text-[#5c5c5c] text-[14px] font-medium">
            Create an account?
            <span
              onClick={() => {
                setState("Sing Up");
              }}
              className="text-[#ff4141] font-semibold cursor-pointer"
            >
              {" "}
              Click here{" "}
            </span>
          </p>
        )}
        {state === "Sing Up" ? (
          <div className="loginsignup-agree flex items-center my-[20px] gap-[20px] text-[#5c5c5c] text-[14px] font-medium">
            <input type="checkbox" name="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LoginSingup;
