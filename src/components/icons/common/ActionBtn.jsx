import React, { useContext } from "react";
import { ProductContext } from "@/providers/ProductProvider";
import { getdata, remove } from "@/functions/product";

const ActionBtn = ({ id }) => {
  const { setProductData } = useContext(ProductContext);
  return (
    <div>
      <div>
        <a className="edit_btn active:bg-slate-600">Edit</a>
        <a
          onClick={() => {
            remove(id)
              .then((res) => console.log(res.data.message))
              .catch((err) => console.log(err.response.data.message))
              .finally(() => {
                getdata()
                  .then((res) => setProductData(res.data.response))
                  .catch((err) => console.log(err.response.data.message));
              });
          }}
          className="remove_btn active:bg-red-600"
        >
          Delete
        </a>
      </div>
    </div>
  );
};

export default ActionBtn;
