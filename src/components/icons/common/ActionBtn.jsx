import React, { useContext, useState } from "react";
import { getdata, remove } from "@/functions/product";
import EditProduct from "@/components/editproduct/EditProduct";
import { ProductContext } from "@/providers/ProductProvider";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

const ActionBtn = ({ data }) => {
  const [editToggle, setEditToggle] = useState(false);
  const { setProductData } = useContext(ProductContext);
  // console.log(data);
  return (
    <div>
      <div>
        <a
          onClick={() => setEditToggle(true)}
          className="rounded-full py-0.5 px-[0.4rem] text-[26px] cursor-pointer hover:bg-gray-200 transition-all duration-300"
        >
          <EditNoteIcon fontSize="inherit" />
        </a>
        <a
          onClick={() => {
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
                remove(data.id)
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
          }}
          className="rounded-full py-0.5 px-[0.4rem] text-[26px] ml-2 cursor-pointer hover:bg-gray-200 transition-all duration-300"
        >
          <DeleteIcon />
        </a>
      </div>
      <EditProduct
        editToggle={editToggle}
        setEditToggle={setEditToggle}
        product_value={data.row}
      />
    </div>
  );
};

export default ActionBtn;
