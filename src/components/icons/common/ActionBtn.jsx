import React, { useContext, useState } from "react";
import { getdata, remove } from "@/functions/product";
import EditProduct from "@/components/editproduct/EditProduct";
import { ProductContext } from "@/providers/ProductProvider";
import Swal from "sweetalert2";

const ActionBtn = ({ data }) => {
  const [editToggle, setEditToggle] = useState(false);
  const { setProductData } = useContext(ProductContext);
  // console.log(data);
  return (
    <div>
      <div>
        <a
          onClick={() => setEditToggle(true)}
          className="edit_btn active:bg-slate-600"
        >
          Edit
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
          className="remove_btn active:bg-red-600"
        >
          Delete
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
