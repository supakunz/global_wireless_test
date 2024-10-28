/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Fragment, useContext, useState } from "react";
import { TransitionChild, Dialog, DialogPanel } from "@headlessui/react";
import TextField from "@mui/material/TextField";
import upload_area from "../../assets/upload_area.svg";
import Image from "next/image";
import Button from "@mui/material/Button";
import { ProductContext } from "@/providers/ProductProvider";
import Swal from "sweetalert2";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { signup } from "@/functions/register";
import { getusers, updateusers } from "@/functions/userdata";
// import bcrypt from "bcrypt";

const EditUsers = ({ userToggle, setUserToggle, product_value }) => {
  const [data, setData] = useState({
    firstName: product_value.firstName,
    lastName: product_value.lastName,
    email: product_value.email,
    password: "",
    role: product_value.role,
  });
  const [image, setImage] = useState(false);
  const { setUserData } = useContext(ProductContext);

  const handleChange = (e) => {
    if (e.target.name === "file") {
      //เมื่อมี file เข้ามาจะ set file ใน form data
      setData({ ...data, [e.target.name]: e.target.files[0] });
      setImage(e.target.files[0]);
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    //**ก่อนที่จะส่งต้องส่ง form เป็น multipart/form-data */

    // ** Add Avatar Feature
    // const formWithImageData = new FormData();
    // for (const key in data) {
    //   formWithImageData.append(key, data[key]);
    // }
    // console.log(formWithImageData); //ไม่แสดงเพราะเป็นแบบ multipart/form-

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //**Updata Product Data**
        updateusers(product_value.id, data)
          .then((res) => {
            Swal.fire("Saved!", "", "success");
            console.log(res.data.message);
          })
          .catch((err) => {
            Swal.fire("Error!", "", "error");
            console.log(err.response.data.message);
          })
          .finally(() => {
            getusers()
              .then((res) => {
                setUserData(res.data.response);
                setUserToggle(false);
                setData({ ...data, password: "" });
              })
              .catch((err) => console.log(err));
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="relative z-10 focus:outline-none test">
      <Dialog open={userToggle} as="div" onClose={() => setUserToggle(false)}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-950/25" />
        </TransitionChild>

        <div className="fixed inset-0 text-slate-700 tablet:left-[15.6rem]">
          <div className="grid min-h-full mx-2 place-items-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="flex flex-col items-center w-full max-w-3xl gap-4 p-4 bg-white border rounded-md shadow-sm border-slate-200">
                <div className="flex justify-end w-full">
                  <button
                    className="p-2 font-medium transition-opacity hover:opacity-60"
                    onClick={() => {
                      setUserToggle(false);
                    }}
                  >
                    Close
                  </button>
                </div>
                <div className="grid grid-cols-[0.8fr_1fr] w-[80%] mb-8 gap-2">
                  <div className="content-center">
                    <label htmlFor="file-input">
                      <Image
                        src={image ? URL.createObjectURL(image) : upload_area}
                        alt="file_image"
                        width={200}
                        height={200}
                        className="object-contain my-[15px] rounded-[10px]"
                      />
                    </label>
                  </div>
                  <div>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5 justify-center"
                      encType="multipart/form-data"
                      // *ต้องกำหนดให้ส่งเป็น multipart/form-data *
                    >
                      <div className="flex gap-4">
                        <TextField
                          required
                          id="outlined-required"
                          name="firstName"
                          label="FirstName"
                          onChange={handleChange}
                          value={data.firstName}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          name="lastName"
                          label="LastName"
                          onChange={handleChange}
                          value={data.lastName}
                        />
                      </div>
                      <TextField
                        required
                        id="outlined-required"
                        name="email"
                        label="Email"
                        type="email"
                        onChange={handleChange}
                        value={data.email}
                      />
                      <TextField
                        id="outlined-required"
                        name="password"
                        label="Password"
                        onChange={handleChange}
                        value={data.password}
                      />
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Role
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={data.role}
                          name="role"
                          label="Role"
                          onChange={handleChange}
                        >
                          <MenuItem className="font-medium" value={"admin"}>
                            Admin
                          </MenuItem>
                          <MenuItem className="font-medium" value={"user"}>
                            User
                          </MenuItem>
                        </Select>
                      </FormControl>
                      {/* Add Avatar Feature */}
                      {/* <input
                        onChange={handleChange}
                        className="box-border w-full h-[50px] rounded-[4px] pl-[15px] border-solid border-[1px] text-[14px] border-[#c3c3c3] text-[#7b7b7b]"
                        type="file"
                        name="file"
                        id="file-input"
                        hidden
                      /> */}
                      <Button variant="contained" size="large" type="submit">
                        Send
                      </Button>
                    </form>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EditUsers;
