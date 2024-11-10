import React, { useContext, useState } from "react";
import { getdata, remove } from "@/functions/product";
import EditProduct from "@/components/editproduct/EditProduct";
import { ProductContext } from "@/providers/ProductProvider";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { getusers, removeusers } from "@/functions/userdata";
import EditUsers from "@/components/editusers/EditUsers";

const ActionBtn = ({ data, action }) => {
  const [editToggle, setEditToggle] = useState(false);
  const [userToggle, setUserToggle] = useState(false);
  const { userData, setProductData, setUserData } = useContext(ProductContext);

  const handleDeleteProduct = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
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
        //**Remove Products**
        const id = { url: data.row.file, id: data.id };
        console.log(id);
        remove(id)
          .then((res) => {
            console.log(res.data.message);
            Swal.close();
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err.response.data.message);
            Swal.close();
            Swal.fire({
              title: "Something Wrong!",
              text: "Please try again later.",
              icon: "error",
            });
          })
          .finally(() => {
            getdata()
              .then((res) => setProductData(res.data.response))
              .catch((err) => console.log(err.response.data.message));
          });
      }
    });
  };

  const handleDeleteUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (userData.length <= 1) {
          return Swal.fire({
            title: "Something Wrong!",
            text: "Your can't remove last user!",
            icon: "error",
          });
        }
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
        //**Remove Products**
        removeusers(data.id)
          .then((res) => {
            console.log(res.data.message);
            Swal.close();
            Swal.fire({
              title: "Deleted!",
              text: "Your user has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err.response.data.message);
            Swal.close();
            Swal.fire({
              title: "Something Wrong!",
              text: "Please try again later.",
              icon: "error",
            });
          })
          .finally(() => {
            getusers()
              .then((res) => setUserData(res.data.response))
              .catch((err) => console.log(err.response.data.message));
          });
      }
    });
  };

  return (
    <div>
      <div>
        <a
          onClick={() => {
            action == "user" ? setUserToggle(true) : setEditToggle(true);
          }}
          className="rounded-full py-0.5 px-[0.4rem] text-[26px] cursor-pointer hover:bg-gray-200 transition-all duration-300"
        >
          <EditNoteIcon fontSize="inherit" />
        </a>
        <a
          onClick={() => {
            action == "user" ? handleDeleteUser() : handleDeleteProduct();
          }}
          className="rounded-full py-0.5 px-[0.4rem] text-[26px] ml-2 cursor-pointer hover:bg-gray-200 transition-all duration-300"
        >
          <DeleteIcon />
        </a>
      </div>
      {action == "user" ? (
        <EditUsers
          userToggle={userToggle}
          setUserToggle={setUserToggle}
          product_value={data.row}
        />
      ) : (
        <EditProduct
          editToggle={editToggle}
          setEditToggle={setEditToggle}
          product_value={data.row}
        />
      )}
    </div>
  );
};

export default ActionBtn;
